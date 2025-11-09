import type { FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { ZodError } from "zod";

import { AppError } from "./errors/app-error.ts";
import { APIError } from "better-auth/api";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error.",
			errors: error.message,
		});
	}

	if (error instanceof AppError) {
		return reply.status(error.httpCode).send({
			message: error.message,
		});
	}

	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: error.message,
		});
	}

	if (error instanceof APIError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	console.error(
		`Request failed with status ${error.statusCode ?? 500}:`,
		error
	);

	return reply.status(error.statusCode ?? 500).send({
		message: "Ocorreu um erro. Tente novamente mais tarde.",
	} satisfies Partial<AppError>);
};
