import fastifySwagger from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import fastifyCors from "@fastify/cors";
import { env } from "./env.ts";
import { errorHandler } from "./error-handler.ts";
import { authRoutes } from "./routes/auth/routes.ts";
import { passwordsRoutes } from "./routes/passwords/routes.ts";

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

app.register(authRoutes, {
  prefix: "/auth",
});
app.register(passwordsRoutes, {
  prefix: "/passwords",
});
