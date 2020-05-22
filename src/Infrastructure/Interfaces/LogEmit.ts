import { LogLevel } from '../Enums';

export interface LogEmit {
	level: LogLevel;
	module: string;
	message: string;
	data?: unknown[];
}
