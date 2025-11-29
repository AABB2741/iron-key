import { z } from "zod";

export const password = z.object({
	id: z.string(),
	name: z.string(),
	login: z.string(),
	password: z.string(),
});
