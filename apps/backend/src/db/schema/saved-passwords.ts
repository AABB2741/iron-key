import { pgTable, uuid, timestamp, text, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema.ts";

const passwords = pgTable(
	"saved_passwords",
	{
		id: uuid().primaryKey().defaultRandom(),
		userId: uuid()
			.notNull()
			.references(() => user.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		name: text(),
		login: text(),
		siteURL: text(),
		encryptedPassword: text().notNull(),
		createdAt: timestamp({ precision: 3, withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp({ precision: 3, withTimezone: true }),
	},
	(table) => [index("user_idx").on(table.userId)]
);
