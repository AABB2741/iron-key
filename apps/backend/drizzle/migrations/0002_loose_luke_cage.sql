ALTER TABLE "saved_password" RENAME TO "saved_passwords";--> statement-breakpoint
ALTER TABLE "saved_passwords" DROP CONSTRAINT "saved_password_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "saved_passwords" ADD CONSTRAINT "saved_passwords_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;