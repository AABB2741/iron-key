import z from "zod";
import { userSchema } from "better-auth/db";

export const userValidation = userSchema.extend({
	id: z.uuid(),
	name: userSchema.shape.name
		.trim()
		.min(1, "Informe seu nome.")
		.max(200, "Nome muito grande."),
	email: z
		.email("E-mail inválido.")
		.trim()
		.toLowerCase()
		.min(1, "Informe seu e-mail.")
		.max(320, "E-mail muito grande."),
	password: z
		.string()
		.min(1, "Informe a senha")
		.min(8, "A senha deve ter pelo menos 8 caracteres")
		.max(128, "Senha muito longa."),
});
