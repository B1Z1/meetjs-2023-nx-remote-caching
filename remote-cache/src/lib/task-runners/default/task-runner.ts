import { defaultTasksRunner } from '@nrwl/devkit';
import { Logger } from '../../util/Logger';
import { TasksRunner } from 'nx/src/tasks-runner/tasks-runner';

export function taskRunner(
	tasks: Parameters<typeof defaultTasksRunner>[0],
	options: Parameters<typeof defaultTasksRunner>[1],
	context: Parameters<typeof defaultTasksRunner>[2]
): TasksRunner {
	const verboseLogging: boolean = process.env['NX_CACHE_VERBOSE_LOGGING'] === 'true';
	const logger: Logger = new Logger('DEFAULT', verboseLogging);

	return defaultTasksRunner(tasks, options, context);
}
