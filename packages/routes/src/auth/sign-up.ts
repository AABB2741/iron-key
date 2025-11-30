import { z } from "zod";

import { signInResponse } from "./sign-in.ts";

export const signUpBody = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
export type SignUpBody = z.infer<typeof signUpBody>;

export const signUp201Response = signInResponse;
export const signUp204Response = z.null();
export const signUpResponse = z.union([signUp201Response, signUp204Response]);

export type SignUp201Response = z.infer<typeof signUp201Response>;
export type SignUp204Response = z.infer<typeof signUp204Response>;
export type SignUpResponse = z.infer<typeof signUpResponse>;
