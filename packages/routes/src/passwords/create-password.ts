import { z } from "zod";

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

export const createPasswordResponse = z.null();
export type CreatePasswordResponse = z.infer<typeof createPasswordResponse>;
