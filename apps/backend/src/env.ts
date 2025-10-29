import z from "zod";

const loggerLevel = z.enum(["info", "error", "warn", "silent"]);

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "staging", "production"])
		.default("production"),

	PORT: z.coerce.number().default(3333),
	LOGGER: loggerLevel.default("info"),
	WEB_URL: z.url(),

	DATABASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);

console.log(`Env: ${env.NODE_ENV}`);
