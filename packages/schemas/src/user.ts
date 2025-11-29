import { z } from "zod";

export const user = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
});
export type User = z.infer<typeof user>;
