import { eq, and } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import {
	updatePasswordBody,
	updatePasswordParams,
	updatePasswordResponse,
} from "@ironkey/routes";

import { db } from "../db/client.ts";
import { encrypt } from "../lib/crypto.ts";
import { HTTP_OK } from "../constants/http/codes.ts";
import { savedPasswords } from "../db/schema/saved-passwords.ts";
import { requireAuthentication } from "./hooks/require-authentication.ts";
import { NotFoundError } from "../errors/http/not-found-error.ts";

export const updatePasswordRoute: FastifyPluginAsyncZod = async (app) => {
	app.patch(
		"/passwords/:id",
		{
			preHandler: [requireAuthentication],
			schema: {
				summary: "Update a saved password",
				tags: ["passwords"],
				params: updatePasswordParams,
				body: updatePasswordBody,
				response: {
					[HTTP_OK]: updatePasswordResponse,
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;
			const body = request.body;

			const foundPasswordEntry = await db
				.select()
				.from(savedPasswords)
				.where(
					and(
						eq(savedPasswords.id, id),
						eq(savedPasswords.userId, request.user.id)
					)
				)
				.limit(1);

			if (foundPasswordEntry.length === 0) {
				throw new NotFoundError("Senha não encontrada");
			}

			const updateData: {
				name?: string;
				login?: string;
				siteUrl?: string;
				encryptedPassword?: string;
			} = {};

			if (body.name !== undefined) updateData.name = body.name;
			if (body.login !== undefined) updateData.login = body.login;
			if (body.siteUrl !== undefined) updateData.siteUrl = body.siteUrl;
			if (body.password !== undefined) {
				updateData.encryptedPassword = encrypt(body.password);
			}

			await db
				.update(savedPasswords)
				.set(updateData)
				.where(
					and(
						eq(savedPasswords.id, id),
						eq(savedPasswords.userId, request.user.id)
					)
				);

			return reply.status(HTTP_OK).send();
		}
	);
};
