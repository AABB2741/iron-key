import { z } from "zod";

import { user } from "@ironkey/schemas";

export const signInBody = z.object({
	email: z.string(),
	password: z.string(),
});
export type SignInBody = z.infer<typeof signInBody>;

export const signInResponse = z.object({
	user: user.pick({ id: true, email: true, name: true }),
	token: z.string(),
});
export type SignInResponse = z.infer<typeof signInResponse>;
