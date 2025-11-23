import { z } from "zod";
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "../db/client.ts";
import { HTTP_OK } from "../constants/http/codes.ts";
import { savedPassword } from "../db/schema/saved-passwords.ts";
import { requireAuthentication } from "./hooks/require-authentication.ts";

export const getSavedPasswordsRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/passwords",
		{
			preHandler: [requireAuthentication],
			schema: {
				summary: "Get all saved passwords",
				tags: ["passwords"],
				response: {
					[HTTP_OK]: z.object({
						passwords: z.array(
							z.object({
								id: z.string(),
								name: z.string().nullable(),
								login: z.string().nullable(),
								siteUrl: z.string().nullable(),
								encryptedPassword: z.string(),
								createdAt: z.date(),
								updatedAt: z.date(),
							})
						),
					}),
				},
			},
		},
		async (request, reply) => {
			const passwords = await db
				.select({
					id: savedPassword.id,
					name: savedPassword.name,
					login: savedPassword.login,
					siteUrl: savedPassword.siteUrl,
					encryptedPassword: savedPassword.encryptedPassword,
					createdAt: savedPassword.createdAt,
					updatedAt: savedPassword.updatedAt,
				})
				.from(savedPassword)
				.where(eq(savedPassword.userId, request.user.id));

			return reply.send({ passwords });
		}
	);
};
