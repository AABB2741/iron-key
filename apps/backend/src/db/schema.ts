import { pgTable, uuid, timestamp, text, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	email: text().notNull().unique(),
	passwordHash: text().notNull(),
	createdAt: timestamp({ precision: 3, withTimezone: true })
		.defaultNow()
		.notNull(),
});

export const passwords = pgTable(
	"saved_passwords",
	{
		id: uuid().primaryKey().defaultRandom(),
		userId: uuid()
			.notNull()
			.references(() => users.id, {
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
