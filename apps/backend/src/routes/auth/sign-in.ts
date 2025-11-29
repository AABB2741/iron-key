import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { HTTP_OK } from "@ironkey/constants/http";
import { signInBody, signInResponse } from "@ironkey/routes/auth";

import { auth } from "../../lib/auth.ts";

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
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
				token,
			});
		}
	);
};
