import { format } from 'date-fns';
import { Log, LogEmit } from '../Infrastructure/Interfaces';
import { LogLevel, Color } from '../Infrastructure/Enums';

export class Logger implements Log {
	public log(module: string, message: string, data?: unknown[]): void {
		this.emitLog({ level: LogLevel.LOG, module, message, data });
	}

	public info(module: string, message: string, data?: unknown[]): void {
		this.emitLog({ level: LogLevel.INFO, module, message, data });
	}

	public warn(module: string, message: string, data?: unknown[]): void {
		this.emitLog({ level: LogLevel.WARN, module, message, data });
	}

	public error(module: string, message: string, data?: unknown[]): void {
		this.emitLog({ level: LogLevel.ERROR, module, message, data });
	}

	public debug(module: string, message: string, data?: unknown[]): void {
		this.emitLog({ level: LogLevel.DEBUG, module, message, data });
	}

	private formatLogElement(element: string, type: string): string {
		const pre: string = '\x1b[';
		const post: string = '\x1b[0m';
		const e: string = type !== 'module' ? element.toUpperCase() : element;

		switch (type) {
			case 'module':
				return pre + Color.MODULE + e + post;
			case LogLevel.LOG:
				return `  ${ pre }${ Color.LOG }${ e }${ post }`;
			case LogLevel.INFO:
				return ` ${ pre }${ Color.LOG }${ e }${ post }`;
			case LogLevel.WARN:
				return ` ${ pre }${ Color.LOG }${ e }${ post }`;
			case LogLevel.ERROR:
			case LogLevel.DEBUG:
				return pre + Color.LOG + e + post;
			default:
				return pre + Color.TIME + e + post;
		}
	}

	private emitLog(log: LogEmit): void {
		const timestamp: string = this.formatLogElement(format(new Date, '[HH:mm:ss]'), 'time');
		const level: string = this.formatLogElement(log.level, log.level);
		const module: string = this.formatLogElement(log.module, 'module');

		if (log.data && log.data.length > 0)
			console[log.level](timestamp, level, `[${ module }]`, log.message, log.data);
		else
			console[log.level](timestamp, level, `[${ module }]`, log.message);
	}
}
