import { z } from "zod";

export const getPasswordByIdParams = z.object({
	id: z.uuid(),
});
export type GetPasswordByIdParams = z.infer<typeof getPasswordByIdParams>;

export const getPasswordByIdResponse = z.object({
	password: z.object({
		id: z.string(),
		name: z.string().nullable(),
		login: z.string().nullable(),
		siteUrl: z.string().nullable(),
		password: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
});
export type GetPasswordByIdResponse = z.infer<typeof getPasswordByIdResponse>;
