import { z } from "zod";

export const signInBody = z.object({
	email: z.string(),
	password: z.string(),
});
export type SignInBody = z.infer<typeof signInBody>;

export const signInResponse = z.object({
	user: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
	}),
	token: z.string(),
});
export type SignInResponse = z.infer<typeof signInResponse>;
