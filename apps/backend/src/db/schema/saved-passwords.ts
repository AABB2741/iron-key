import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema.ts";

export const savedPasswords = pgTable(
	"saved_passwords",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, {
				onDelete: "cascade",
			}),
		name: text("name"),
		login: text("login"),
		siteUrl: text("site_url"),
		encryptedPassword: text("encrypted_password").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("saved_password_user_idx").on(table.userId)]
);
