import { z } from "zod";

export const getPasswordsResponse = z.object({
	passwords: z
		.object({
			id: z.string(),
			name: z.string().nullable(),
			login: z.string().nullable(),
			siteUrl: z.string().nullable(),
			password: z.string(),
			createdAt: z.date(),
			updatedAt: z.date(),
		})
		.array(),
});
export type GetPasswordsResponse = z.infer<typeof getPasswordsResponse>;
