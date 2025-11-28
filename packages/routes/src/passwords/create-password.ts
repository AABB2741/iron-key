import { z } from "zod";

export const createPasswordBody = z.object({
	name: z.string().optional(),
	login: z.string().optional(),
	siteUrl: z.string().optional(),
	password: z.string(),
});
export type CreatePasswordBody = z.infer<typeof createPasswordBody>;

export const createPasswordResponse = z.null();
export type CreatePasswordResponse = z.infer<typeof createPasswordResponse>;
