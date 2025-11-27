import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { db } from "../db/client.ts";
import { encrypt } from "../lib/crypto.ts";
import { HTTP_CREATED } from "../constants/http/codes.ts";
import { savedPasswords } from "../db/schema/saved-passwords.ts";
import { requireAuthentication } from "./hooks/require-authentication.ts";

export const savePasswordRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/passwords",
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
					[HTTP_CREATED]: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { name, login, siteUrl, password } = request.body;

			const encryptedPassword = encrypt(password);

			await db.insert(savedPasswords).values({
				id: crypto.randomUUID(),
				name,
				login,
				encryptedPassword,
				siteUrl,
				userId: request.user.id,
			});

			return reply.status(HTTP_CREATED).send();
		}
	);
};
