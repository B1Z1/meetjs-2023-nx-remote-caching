import { defaultTasksRunner, output } from '@nrwl/devkit';

export function taskRunner(
	tasks: Parameters<typeof defaultTasksRunner>[0],
	options: Parameters<typeof defaultTasksRunner>[1],
	context: Parameters<typeof defaultTasksRunner>[2],
): string {
  output.log({ title: 'DEFAULT' });

	return defaultTasksRunner(tasks, options, context);
}
