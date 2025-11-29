import { eq, and } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import {
	getPasswordByIdParams,
	getPasswordByIdResponse,
} from "@ironkey/routes/passwords";
import { HTTP_OK } from "@ironkey/constants/http";

import { db } from "../../db/client.ts";
import { decrypt } from "../../lib/crypto.ts";
import { savedPasswords } from "../../db/schema/saved-passwords.ts";
import { NotFoundError } from "../../errors/http/not-found-error.ts";
import { requireAuthentication } from "../_hooks/require-authentication.ts";

export const getPasswordByIdRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/:id",
		{
			preHandler: [requireAuthentication],
			schema: {
				summary: "Get a saved password by id",
				tags: ["passwords"],
				params: getPasswordByIdParams,
				response: {
					[HTTP_OK]: getPasswordByIdResponse,
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const result = await db
				.select({
					id: savedPasswords.id,
					name: savedPasswords.name,
					login: savedPasswords.login,
					siteUrl: savedPasswords.siteUrl,
					encryptedPassword: savedPasswords.encryptedPassword,
					createdAt: savedPasswords.createdAt,
					updatedAt: savedPasswords.updatedAt,
				})
				.from(savedPasswords)
				.where(
					and(
						eq(savedPasswords.id, id),
						eq(savedPasswords.userId, request.user.id)
					)
				)
				.limit(1);

			if (result.length === 0) {
				throw new NotFoundError("Senha não encontrada");
			}

			const password = result[0];

			return reply.status(HTTP_OK).send({
				password: {
					id: password.id,
					name: password.name,
					login: password.login,
					siteUrl: password.siteUrl,
					password: decrypt(password.encryptedPassword),
					createdAt: password.createdAt,
					updatedAt: password.updatedAt,
				},
			});
		}
	);
};
