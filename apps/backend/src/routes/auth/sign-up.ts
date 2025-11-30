import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { HTTP_CREATED, HTTP_NO_CONTENT } from "@ironkey/constants/http";
import {
  signUp201Response,
  signUp204Response,
  signUpBody,
} from "@ironkey/routes/auth";

import { auth } from "../../lib/auth.ts";

export const signUpRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/sign-up",
    {
      schema: {
        summary: "Sign-up",
        tags: ["session"],
        body: signUpBody,
        response: {
          [HTTP_CREATED]: signUp201Response,
          [HTTP_NO_CONTENT]: signUp204Response,
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;

      const { user, token } = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });

      if (!token) {
        return reply.status(HTTP_NO_CONTENT).send();
      }

      return reply.status(HTTP_CREATED).send({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    },
  );
};
