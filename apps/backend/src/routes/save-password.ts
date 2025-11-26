import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "../db/client.ts";
import { encrypt } from "../lib/crypto.ts";
import { HTTP_CREATED } from "../constants/http/codes.ts";
import { savedPasswords } from "../db/schema/saved-passwords.ts";
import { requireAuthentication } from "./hooks/require-authentication.ts";

export const savePasswordRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/save-password",
		{
			preHandler: [requireAuthentication],
			schema: {
				summary: "Save a new password",
				tags: ["passwords"],
				body: z.object({
					name: z.string().optional(),
					login: z.string().optional(),
					siteUrl: z.string().optional(),
					password: z.string(),
				}),
				response: {
					[HTTP_CREATED]: z.object({
						name: z.string().nullable(),
						login: z.string().nullable(),
						siteUrl: z.string().nullable(),
						password: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, login, siteUrl, password } = request.body;

			const encryptedPassword = encrypt(password);

			const result = await db
				.insert(savedPasswords)
				.values({
					id: crypto.randomUUID(),
					name,
					login,
					encryptedPassword,
					siteUrl,
					userId: request.user.id,
				})
				.returning();

			return reply.status(HTTP_CREATED).send({
				name: result[0].name,
				login: result[0].login,
				siteUrl: result[0].siteUrl,
				password: result[0].encryptedPassword,
			});
		}
	);
};
