import { UnauthorizedError } from "../http/unauthorized-error.ts";

export class SignInRequiredError extends UnauthorizedError {
	constructor(message = "Faça login para continuar.") {
		super(message);
	}
}
