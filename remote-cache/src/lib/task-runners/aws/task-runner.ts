import { defaultTasksRunner } from '@nrwl/devkit';
import { Logger } from '../../util/Logger';
import { AwsConfig } from './AwsConfig';
import { config as dotEnvConfiguration } from 'dotenv';
import * as process from 'process';
import { AwsCacheRunner } from './AwsCacheRunner';
import { TasksRunner } from 'nx/src/tasks-runner/tasks-runner';

dotEnvConfiguration();

/**
 * This function will resolve the config from the environment variables.
 * If the environment variable is not set, it will use the value from the
 * option's parameter.
 */
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
	/**
	 * Options passed in from the nx.json file. So if you want to add more options,
	 * you need to add them to the nx.json file and create your own interface for them.
	 */
	options: Parameters<typeof defaultTasksRunner>[1] & AwsConfig,
	context: Parameters<typeof defaultTasksRunner>[2]
): TasksRunner {
	const verboseLogging: boolean = process.env['NX_CACHE_VERBOSE_LOGGING'] === 'true';
	const logger: Logger = new Logger('AWS', verboseLogging);
	const config: AwsConfig = resolveEnvConfig(options);
	const awsRemoteCache: AwsCacheRunner = new AwsCacheRunner(config, logger);

	/**
	 * To make remote cache work, we need to override the default cache runner
	 * with our own implementation. This is done by passing the remote cache
	 * implementation to the defaultTasksRunner function.
	 *
	 * You can also learn more about the defaultTasksRunner to make your own
	 * changes to the cache runner.
	 */
	return defaultTasksRunner(
		tasks,
		{
			...options,
			remoteCache: {
				retrieve: (hash: string, cacheDirectory: string) => {
					return awsRemoteCache.retrieve(hash, cacheDirectory);
				},
				store: (hash: string, cacheDirectory: string) => {
					return awsRemoteCache.store(hash, cacheDirectory);
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
