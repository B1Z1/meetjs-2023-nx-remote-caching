import { output } from '@nrwl/devkit';

type LogType = 'log' | 'warn' | 'error';

export class Logger {
	constructor(
		private readonly prefix: string
	) {
	}

	debug(message: string): void {
		if (!process.env['NX_CACHE_VERBOSE_LOGGING']) {
			return;
		}

		this.log('log', `DEBUG: ${message}`);
	}

	note(message: string): void {
		this.log('log', message);
	}

	warn(message: string): void {
		this.log('warn', message);
	}

	error(message: string): void {
		this.log('error', message);
	}

	private log(type: LogType, message: string): void {
		output.addNewline();
		output[type]({
			title: `${this.prefix} - ${message}`
		});
		output.addNewline();
	}
}