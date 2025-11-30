import { z } from "zod";

export const listPasswordsItem = z.object({
  id: z.string(),
  name: z.string().nullable(),
  login: z.string().nullable(),
  siteUrl: z.string().nullable(),
  password: z.string(),
  createdAt: z.date().transform((d) => d.toISOString()),
  updatedAt: z.date().transform((d) => d.toISOString()),
});
export type ListPasswordsItem = z.infer<typeof listPasswordsItem>;

export const listPasswordsResponse = z.object({
  passwords: z.array(listPasswordsItem),
});
export type ListPasswordsResponse = z.infer<typeof listPasswordsResponse>;
