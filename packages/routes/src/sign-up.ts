import { z } from "zod";

export const signUpBody = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});
export type SignUpBody = z.infer<typeof signUpBody>;

export const signUpResponse = z.null();
export type SignUpResponse = z.infer<typeof signUpResponse>;
