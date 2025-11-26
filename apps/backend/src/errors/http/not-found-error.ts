import { AppError } from "../app-error.ts";
import { HTTP_NOT_FOUND } from "../../constants/http/codes.ts";

export class NotFoundError extends AppError {
	constructor(message = "Recurso não encontrado.", httpCode = HTTP_NOT_FOUND) {
		super(message, httpCode);
	}
}
