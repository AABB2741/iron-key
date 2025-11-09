import { AppError } from "../app-error.ts";
import { HTTP_UNAUTHORIZED } from "../../constants/http/codes.ts";

export class UnauthorizedError extends AppError {
	constructor(message = "Não autorizado.", httpCode = HTTP_UNAUTHORIZED) {
		super(message, httpCode);
	}
}
