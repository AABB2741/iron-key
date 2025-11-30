import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { HTTP_CREATED } from "@ironkey/constants/http";
import {
  createPasswordBody,
  createPasswordResponse,
} from "@ironkey/routes/passwords";

import { db } from "../../db/client.ts";
import { savedPasswords } from "../../db/schema/saved-passwords.ts";
import { encrypt } from "../../lib/crypto.ts";
import { requireAuthentication } from "../_hooks/require-authentication.ts";

export const createPasswordRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      preHandler: [requireAuthentication],
      schema: {
        summary: "Create a password",
        tags: ["passwords"],
        body: createPasswordBody,
        response: {
          [HTTP_CREATED]: createPasswordResponse,
        },
      },
    },
    async (request, reply) => {
      const { name, login, siteUrl, password } = request.body;

      const encryptedPassword = encrypt(password);

      const [savedPassword] = await db
        .insert(savedPasswords)
        .values({
          id: crypto.randomUUID(),
          name,
          login,
          encryptedPassword,
          siteUrl,
          userId: request.user.id,
        })
        .returning({
          id: savedPasswords.id,
          name: savedPasswords.name,
          login: savedPasswords.login,
          siteUrl: savedPasswords.siteUrl,
          createdAt: savedPasswords.createdAt,
          updatedAt: savedPasswords.updatedAt,
        });

      return reply.status(HTTP_CREATED).send({
        password: {
          ...savedPassword,
          password,
        },
      });
    },
  );
};
