import type { FastifyRequest, FastifyReply } from "fastify";

import { auth } from "../../lib/auth.ts";
import { SignInRequiredError } from "../../errors/session/sign-in-required-error.ts";

export async function requireAuthentication(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const headers = new Headers();
	Object.entries(request.headers).forEach(([key, value]) => {
		if (value) headers.append(key, value.toString());
	});

	const data = await auth.api.getSession({ headers });

	if (!data?.session || !data?.user) {
		throw new SignInRequiredError();
	}

	request.user = data.user;
}
