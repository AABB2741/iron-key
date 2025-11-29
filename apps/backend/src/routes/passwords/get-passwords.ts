import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { HTTP_OK } from "@ironkey/constants/http";
import { listPasswordsResponse } from "@ironkey/routes/passwords";

import { db } from "../../db/client.ts";
import { savedPasswords } from "../../db/schema/saved-passwords.ts";
import { decrypt } from "../../lib/crypto.ts";
import { requireAuthentication } from "../_hooks/require-authentication.ts";

export const getPasswordsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/",
    {
      preHandler: [requireAuthentication],
      schema: {
        summary: "Get saved passwords",
        tags: ["passwords"],
        response: {
          [HTTP_OK]: listPasswordsResponse,
        },
      },
    },
    async (request, reply) => {
      const passwords = await db
        .select({
          id: savedPasswords.id,
          name: savedPasswords.name,
          login: savedPasswords.login,
          siteUrl: savedPasswords.siteUrl,
          encryptedPassword: savedPasswords.encryptedPassword,
          createdAt: savedPasswords.createdAt,
          updatedAt: savedPasswords.updatedAt,
        })
        .from(savedPasswords)
        .where(eq(savedPasswords.userId, request.user.id));

      const decryptedPasswords = passwords.map((p) => ({
        id: p.id,
        name: p.name,
        login: p.login,
        siteUrl: p.siteUrl,
        password: decrypt(p.encryptedPassword),
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));

      return reply.send({ passwords: decryptedPasswords });
    },
  );
};
