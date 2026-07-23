import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_gallery_orientation" AS ENUM('portrait', 'landscape');
  CREATE TYPE "public"."enum_pages_blocks_gallery_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_orientation" AS ENUM('portrait', 'landscape');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_image_position" AS ENUM('left', 'right');
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "orientation" "enum_pages_blocks_gallery_orientation" DEFAULT 'landscape';
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "image_position" "enum_pages_blocks_gallery_image_position" DEFAULT 'right';
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "orientation" "enum__pages_v_blocks_gallery_orientation" DEFAULT 'landscape';
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "image_position" "enum__pages_v_blocks_gallery_image_position" DEFAULT 'right';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_gallery" DROP COLUMN "orientation";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "image_position";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "orientation";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "image_position";
  DROP TYPE "public"."enum_pages_blocks_gallery_orientation";
  DROP TYPE "public"."enum_pages_blocks_gallery_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_orientation";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_image_position";`)
}
