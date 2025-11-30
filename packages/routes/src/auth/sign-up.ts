import { z } from "zod";

import { signInResponse } from "./sign-in.ts";

export const signUpBody = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
export type SignUpBody = z.infer<typeof signUpBody>;

export const signUpResponse = signInResponse;
export type SignUpResponse = z.infer<typeof signUpResponse>;
