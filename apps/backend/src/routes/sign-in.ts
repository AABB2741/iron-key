import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { signInBody, signInResponse } from "@ironkey/routes";

import { auth } from "../lib/auth.ts";
import { HTTP_OK } from "../constants/http/codes.ts";

export const signInRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/sign-in",
		{
			schema: {
				summary: "Sign-in",
				tags: ["session"],
				body: signInBody,
				response: {
					[HTTP_OK]: signInResponse,
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
