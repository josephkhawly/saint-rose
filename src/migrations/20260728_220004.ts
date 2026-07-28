import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_visit" DROP COLUMN "lede";
  ALTER TABLE "pages_blocks_visit" DROP COLUMN "accent_color";
  ALTER TABLE "_pages_v_blocks_visit" DROP COLUMN "lede";
  ALTER TABLE "_pages_v_blocks_visit" DROP COLUMN "accent_color";
  DROP TYPE "public"."enum_pages_blocks_visit_accent_color";
  DROP TYPE "public"."enum__pages_v_blocks_visit_accent_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_visit_accent_color" AS ENUM('rose', 'deep-rose', 'dark-chocolate', 'mint', 'lavender', 'sky', 'garden', 'olive', 'lima');
  CREATE TYPE "public"."enum__pages_v_blocks_visit_accent_color" AS ENUM('rose', 'deep-rose', 'dark-chocolate', 'mint', 'lavender', 'sky', 'garden', 'olive', 'lima');
  ALTER TABLE "pages_blocks_visit" ADD COLUMN "lede" varchar;
  ALTER TABLE "pages_blocks_visit" ADD COLUMN "accent_color" "enum_pages_blocks_visit_accent_color" DEFAULT 'rose';
  ALTER TABLE "_pages_v_blocks_visit" ADD COLUMN "lede" varchar;
  ALTER TABLE "_pages_v_blocks_visit" ADD COLUMN "accent_color" "enum__pages_v_blocks_visit_accent_color" DEFAULT 'rose';`)
}
