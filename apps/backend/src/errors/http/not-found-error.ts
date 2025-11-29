import { HTTP_NOT_FOUND } from "@ironkey/constants/http";

import { AppError } from "../app-error.ts";

export class NotFoundError extends AppError {
	constructor(message = "Recurso não encontrado.", httpCode = HTTP_NOT_FOUND) {
		super(message, httpCode);
	}
}
