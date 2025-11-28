import { z } from "zod";

export const deletePasswordParams = z.object({
	id: z.uuid(),
});
export type DeletePasswordParams = z.infer<typeof deletePasswordParams>;

export const deletePasswordResponse = z.null();
export type DeletePasswordResponse = z.infer<typeof deletePasswordResponse>;
