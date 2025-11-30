import { z } from "zod";

import { getPasswordByIdResponse } from "./get-password-by-id.ts";

export const createPasswordBody = z.object({
  name: z
    .string()
    .transform((v) => v || undefined)
    .optional(),
  login: z
    .string()
    .transform((v) => v || undefined)
    .optional(),
  siteUrl: z
    .string()
    .transform((v) => v || undefined)
    .optional(),
  password: z.string(),
});
export type CreatePasswordBody = z.infer<typeof createPasswordBody>;

export const createPasswordResponse = getPasswordByIdResponse;
export type CreatePasswordResponse = z.infer<typeof createPasswordResponse>;
