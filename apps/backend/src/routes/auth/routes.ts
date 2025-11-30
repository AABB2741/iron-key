import type { FastifyInstance } from "fastify";

import { signInRoute } from "./sign-in.ts";
import { signUpRoute } from "./sign-up.ts";
import { continueSessionRoute } from "./continue-session.ts";

export async function authRoutes(app: FastifyInstance) {
	app.register(signInRoute);
	app.register(signUpRoute);
	app.register(continueSessionRoute);
}
