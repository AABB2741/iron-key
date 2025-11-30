import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { HTTP_OK } from "@ironkey/constants/http";
import { continueSessionResponse } from "@ironkey/routes/auth";

import { auth } from "../../lib/auth.ts";
import { SignInRequiredError } from "../../errors/session/sign-in-required-error.ts";

export const continueSessionRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/continue-session",
		{
			schema: {
				summary: "Continue session",
				tags: ["session"],
				response: {
					[HTTP_OK]: continueSessionResponse,
				},
			},
		},
		async (request, reply) => {
			const headers = new Headers();
			Object.entries(request.headers).forEach(([key, value]) => {
				if (value) headers.append(key, value.toString());
			});

			const data = await auth.api.getSession({ headers });

			if (!data?.session || !data?.user) {
				throw new SignInRequiredError();
			}

			return reply.send({
				user: {
					id: data.user.id,
					email: data.user.email,
					name: data.user.name,
				},
				token: data.session.token,
			});
		}
	);
};
