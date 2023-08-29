import { defaultTasksRunner } from '@nrwl/devkit';
import { Logger } from '../../util/Logger';
import { AwsConfig } from './AwsConfig';
import { config as dotEnvConfiguration } from 'dotenv';
import * as process from 'process';
import { DefaultTaskRunnerOutput } from '../../util/DefaultTaskRunnerOutput';

dotEnvConfiguration();

function resolveEnvConfig(options: AwsConfig): AwsConfig {
	return {
		bucketName: process.env['NX_CACHE_AWS_BUCKET_NAME'] ?? options.bucketName,
		region: process.env['NX_CACHE_AWS_REGION'] ?? options.region,
		accessKeyId: process.env['NX_CACHE_AWS_ACCESS_KEY_ID'] ?? options.accessKeyId,
		secretAccessKey: process.env['NX_CACHE_AWS_SECRET_ACCESS_KEY'] ?? options.secretAccessKey
	}
}

export function taskRunner(
	tasks: Parameters<typeof defaultTasksRunner>[0],
	options: Parameters<typeof defaultTasksRunner>[1] & AwsConfig,
	context: Parameters<typeof defaultTasksRunner>[2]
): DefaultTaskRunnerOutput {
	const verboseLogging: boolean = process.env['NX_CACHE_VERBOSE_LOGGING'] === 'true';
	const logger: Logger = new Logger('AWS', verboseLogging);
	const config: AwsConfig = resolveEnvConfig(options);

	return defaultTasksRunner(
		tasks,
		{
			...options,
			remoteCache: {
				retrieve: (hash: string, cacheDirectory: string) => {
					return Promise.resolve(false);
				},
				store: (hash: string, cacheDirectory: string) => {
					return Promise.resolve(false);
				}
			}
		},
		context
	)
		.catch((error: any) => {
			logger.warn(error.message);
			logger.note('Retrying with local cache');

			return defaultTasksRunner(tasks, options, context);
		});
}
