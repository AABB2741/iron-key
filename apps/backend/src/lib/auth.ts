import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/client.ts";
import * as authSchema from "../db/schema/auth-schema.ts";
import { env } from "../env.ts";

export const auth = betterAuth({
	baseURL: env.API_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...authSchema,
			usePlural: true,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
});
