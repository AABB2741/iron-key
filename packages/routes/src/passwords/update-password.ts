import { z } from "zod";

export const updatePasswordParams = z.object({
  id: z.uuid(),
});
export type UpdatePasswordParams = z.infer<typeof updatePasswordParams>;

export const updatePasswordBody = z.object({
  name: z.string().optional(),
  login: z.string().optional(),
  siteUrl: z.string().optional(),
  password: z.string().optional(),
});
export type UpdatePasswordBody = z.infer<typeof updatePasswordBody>;

export const updatePasswordResponse = z.null();
export type UpdatePasswordResponse = z.infer<typeof updatePasswordResponse>;
