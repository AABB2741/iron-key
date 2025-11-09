import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { auth } from "../lib/auth.ts";
import { userValidation } from "../schemas/user.ts";
import { HTTP_NO_CONTENT } from "../constants/http/codes.ts";

export const signUpRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/sign-up",
		{
			schema: {
				summary: "Sign-up",
				tags: ["session"],
				body: userValidation.pick({ name: true, email: true, password: true }),
				response: {
					[HTTP_NO_CONTENT]: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { name, email, password } = request.body;

			await auth.api.signUpEmail({
				body: {
					name,
					email,
					password,
				},
			});

			return reply.status(HTTP_NO_CONTENT).send();
		}
	);
};
