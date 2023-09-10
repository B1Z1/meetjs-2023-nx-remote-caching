import { AwsConfig } from './AwsConfig';
import { Logger } from '../../util/Logger';
import { GetObjectCommandOutput, S3 } from '@aws-sdk/client-s3';
import { mkdir, writeFile } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { create, extract } from 'tar';
import { join } from 'path';

export class AwsCacheRunner {
	private readonly s3: S3;
	private readonly bucketName: string;

	constructor(
		config: AwsConfig,
		private readonly logger: Logger
	) {
		this.s3 = new S3({
			region: config.region,
			credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey
			}
		});
		this.bucketName = config.bucketName;
	}

	async retrieve(hash: string, cacheDirectory: string): Promise<boolean> {
		try {
			this.logger.debug('Retrieving the cache');
			this.logger.debug(`Hash: ${hash}`);
			this.logger.debug(`Cache directory: ${cacheDirectory}`);

			// AWS Logic to retrieve the cache. If you want to use another cloud provider, you need to change this logic
			const result: GetObjectCommandOutput = await this.s3.getObject({
				Bucket: this.bucketName,
				Key: this.addZipSuffix(hash)
			});
			const stream = result.Body as NodeJS.ReadableStream;

			// Create the cache directory before unzipping the file
			const cacheDirectoryWithHash = join(cacheDirectory, hash);

			await this.createCacheDirectory(cacheDirectoryWithHash);

			// Unzip file and place it in the cache directory
			await this.unzipFile(stream, cacheDirectoryWithHash);

			// Create the suffix file. PS: I'm not sure why this is needed, but without it NX won't use the cache
			await this.createCommitFile(cacheDirectoryWithHash);

			// Return true to indicate that the cache was retrieved
			return true;
		} catch (error: any) {
			this.logger.debug('Can\'t load the cache, trying with local');
			this.logger.debug(JSON.stringify(error));

			// Return false to indicate that the cache was not retrieved
			return false;
		}
	}

	async store(hash: string, cacheDirectory: string): Promise<boolean> {
		try {
			this.logger.debug('Storing the cache');
			this.logger.debug(`Hash: ${hash}`);
			this.logger.debug(`Cache directory: ${cacheDirectory}`);

			// Create stream from the cache directory
			const stream = await create({ gzip: true, C: cacheDirectory }, [hash]);

			// AWS Logic to store the cache. AWS requires a buffer to store the cache
			const buffer: Buffer = await this.convertStreamToBuffer(stream);

			await this.s3.putObject({
				Bucket: this.bucketName,
				Key: this.addZipSuffix(hash),
				Body: buffer
			});

			// Return true to indicate that the cache was retrieved
			return true;
		} catch (error: any) {
			this.logger.debug('Can\'t store the cache');
			this.logger.debug(JSON.stringify(error.message));

			// Return false to indicate that the cache was not retrieved
			return false;
		}
	}

	private async createCommitFile(destination: string) {
		await writeFile(this.addCommitSuffix(destination), 'true');
	}

	private async unzipFile(stream: NodeJS.ReadableStream, destination: string) {
		await pipeline(stream, extract({ C: destination, strip: 1 }));
	}

	private async createCacheDirectory(destination: string) {
		await mkdir(destination, { recursive: true });
	}

	private addZipSuffix(hash: string): string {
		return `${hash}.tar.gz`;
	}

	private addCommitSuffix(hash: string): string {
		return `${hash}.commit`;
	}

	private convertStreamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			const chunks: Buffer[] = [];

			stream.on('data', (chunk: Buffer) => {
				chunks.push(chunk);
			});

			stream.on('error', (error: any) => {
				reject(error);
			});

			stream.on('end', () => {
				resolve(Buffer.concat(chunks));
			});
		});
	}
}