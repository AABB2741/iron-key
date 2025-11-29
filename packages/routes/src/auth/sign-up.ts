import { z } from "zod";

import { user } from "@ironkey/schemas";

export const signUpBody = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});
export type SignUpBody = z.infer<typeof signUpBody>;

export const signUpResponse = user;
export type SignUpResponse = z.infer<typeof signUpResponse>;
