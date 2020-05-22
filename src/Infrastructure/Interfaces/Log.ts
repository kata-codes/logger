export interface Log {
	log(module: string, logMessage: string, ...logData: unknown[]): void;
	info(module: string, logMessage: string, ...logData: unknown[]): void;
	warn(module: string, logMessage: string, ...logData: unknown[]): void;
	error(module: string, logMessage: string, ...logData: unknown[]): void;
	debug(module: string, logMessage: string, ...logData: unknown[]): void;
}
