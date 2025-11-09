import z from "zod";

const loggerLevel = z.enum(["info", "error", "warn", "silent"]);

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "staging", "production"])
		.default("production"),

	PORT: z.coerce.number().default(3333),
	WEB_URL: z.url(),
	API_URL: z.url(),
	LOGGER: loggerLevel.default("info"),

	DATABASE_URL: z.url(),

	BETTER_AUTH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);

console.log(`Env: ${env.NODE_ENV}`);
