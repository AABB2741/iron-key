import { z } from "zod";
import { eq, and } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "../db/client.ts";
import { HTTP_NO_CONTENT } from "../constants/http/codes.ts";
import { savedPasswords } from "../db/schema/saved-passwords.ts";
import { NotFoundError } from "../errors/http/not-found-error.ts";
import { requireAuthentication } from "./hooks/require-authentication.ts";

export const deletePasswordRoute: FastifyPluginAsyncZod = async (app) => {
	app.delete(
		"/passwords/:id",
		{
			preHandler: [requireAuthentication],
			schema: {
				summary: "Delete a saved password",
				tags: ["passwords"],
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					[HTTP_NO_CONTENT]: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const result = await db
				.delete(savedPasswords)
				.where(
					and(
						eq(savedPasswords.id, id),
						eq(savedPasswords.userId, request.user.id)
					)
				)
				.returning();

			if (result.length === 0) {
				throw new NotFoundError("Senha não encontrada");
			}

			return reply.status(HTTP_NO_CONTENT).send();
		}
	);
};
