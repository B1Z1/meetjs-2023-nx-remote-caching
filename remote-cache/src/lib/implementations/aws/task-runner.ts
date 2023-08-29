import { defaultTasksRunner } from '@nrwl/devkit';
import { Logger } from '../../util/Logger';

export function taskRunner(
	tasks: Parameters<typeof defaultTasksRunner>[0],
	options: Parameters<typeof defaultTasksRunner>[1],
	context: Parameters<typeof defaultTasksRunner>[2]
): string {
	const logger = new Logger('AWS');

	return defaultTasksRunner(tasks, options, context);
}
