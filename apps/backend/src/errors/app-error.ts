export class AppError extends Error {
	httpCode: number;

	constructor(message: string, httpCode: number) {
		super(message);
		this.httpCode = httpCode;
	}
}
