import { HTTP_UNAUTHORIZED } from "@ironkey/constants/http";

import { AppError } from "../app-error.ts";

export class UnauthorizedError extends AppError {
	constructor(message = "Não autorizado.", httpCode = HTTP_UNAUTHORIZED) {
		super(message, httpCode);
	}
}
