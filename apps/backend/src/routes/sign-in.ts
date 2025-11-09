import z from "zod";
import { userSchema } from "better-auth/db";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { auth } from "../lib/auth.ts";
import { userValidation } from "../schemas/user.ts";
import { HTTP_OK } from "../constants/http/codes.ts";

export const signInRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/sign-in",
		{
			schema: {
				summary: "Sign-in",
				tags: ["session"],
				body: userValidation.pick({ email: true, password: true }),
				response: {
					[HTTP_OK]: z.object({
						user: userSchema.pick({
							id: true,
							name: true,
							email: true,
						}),
						token: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, password } = request.body;

			const headers = new Headers();
			Object.entries(request.headers).forEach(([key, value]) => {
				if (value) headers.append(key, value.toString());
			});

			const { user, token } = await auth.api.signInEmail({
				body: {
					email,
					password,
				},
				headers,
			});

			return reply.send({
				user,
				token,
			});
		}
	);
};
