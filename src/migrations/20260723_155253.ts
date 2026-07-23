import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_hover_accent_color" AS ENUM('rose', 'deep-rose', 'dark-chocolate', 'mint', 'lavender', 'sky', 'garden', 'olive', 'lima');
  ALTER TABLE "header_nav_items" ADD COLUMN "hover_accent_color" "enum_header_nav_items_hover_accent_color" DEFAULT 'rose';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items" DROP COLUMN "hover_accent_color";
  DROP TYPE "public"."enum_header_nav_items_hover_accent_color";`)
}
