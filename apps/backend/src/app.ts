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

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
