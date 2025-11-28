import type { FastifyInstance } from "fastify";

import { getPasswordsRoute } from "./get-passwords.ts";
import { createPasswordRoute } from "./create-password.ts";
import { getPasswordByIdRoute } from "./get-password-by-id.ts";
import { updatePasswordRoute } from "./update-password.ts";
import { deletePasswordRoute } from "./delete-password.ts";

export async function passwordsRoutes(app: FastifyInstance) {
	app.register(createPasswordRoute);
	app.register(getPasswordsRoute);
	app.register(getPasswordByIdRoute);
	app.register(updatePasswordRoute);
	app.register(deletePasswordRoute);
}
