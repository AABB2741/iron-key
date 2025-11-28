import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { signUpBody, signUpResponse } from "@ironkey/routes";

import { auth } from "../lib/auth.ts";
import { HTTP_NO_CONTENT } from "../constants/http/codes.ts";

export const signUpRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/sign-up",
		{
			schema: {
				summary: "Sign-up",
				tags: ["session"],
				body: signUpBody,
				response: {
					[HTTP_NO_CONTENT]: signUpResponse,
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
