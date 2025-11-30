import { z } from "zod";

import { user } from "@ironkey/schemas";

export const continueSessionResponse = z.object({
	user: user.pick({ id: true, email: true, name: true }),
	token: z.string(),
});
export type ContinueSessionResponse = z.infer<typeof continueSessionResponse>;
