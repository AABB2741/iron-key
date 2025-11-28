import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import {
	validatorCompiler,
	serializerCompiler,
	jsonSchemaTransform,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import scalarAPIReference from "@scalar/fastify-api-reference";

import { env } from "./env.ts";
import fastifyCors from "@fastify/cors";
import { errorHandler } from "./error-handler.ts";
import { signUpRoute } from "./routes/sign-up.ts";
import { signInRoute } from "./routes/sign-in.ts";
import { getPasswordsRoute } from "./routes/get-passwords.ts";
import { getPasswordByIdRoute } from "./routes/get-password-by-id.ts";
import { savePasswordRoute } from "./routes/save-password.ts";
import { deletePasswordRoute } from "./routes/delete-password.ts";
import { updatePasswordRoute } from "./routes/update-password.ts";

export const app = fastify({
	logger: {
		level: env.LOGGER,
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MMss Z",
				ignore: "pid,hostname",
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: env.WEB_URL,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

if (env.NODE_ENV === "development") {
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: "IronKey",
				description: "IronKey API.",
				version: "0.1.0",
			},
		},
		transform: jsonSchemaTransform,
	});

	app.register(scalarAPIReference, {
		routePrefix: "/docs",
		configuration: {
			theme: "elysiajs",
		},
	});
}

app.setErrorHandler(errorHandler);

app.get("/", () => "Ok");

app.register(signUpRoute);
app.register(signInRoute);
app.register(getPasswordsRoute);
app.register(getPasswordByIdRoute);
app.register(savePasswordRoute);
app.register(updatePasswordRoute);
app.register(deletePasswordRoute);
