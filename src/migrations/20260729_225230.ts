import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_banner_with_text_image_position" AS ENUM('top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_with_text_image_position" AS ENUM('top', 'bottom');
  ALTER TABLE "pages_blocks_banner_with_text" ADD COLUMN "image_position" "enum_pages_blocks_banner_with_text_image_position" DEFAULT 'top';
  ALTER TABLE "_pages_v_blocks_banner_with_text" ADD COLUMN "image_position" "enum__pages_v_blocks_banner_with_text_image_position" DEFAULT 'top';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_banner_with_text" DROP COLUMN "image_position";
  ALTER TABLE "_pages_v_blocks_banner_with_text" DROP COLUMN "image_position";
  DROP TYPE "public"."enum_pages_blocks_banner_with_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_banner_with_text_image_position";`)
}
