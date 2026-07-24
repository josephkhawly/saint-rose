import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_image_position" AS ENUM('left', 'right');
  ALTER TABLE "pages" ADD COLUMN "intro_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "image_position" "enum_pages_image_position" DEFAULT 'right';
  ALTER TABLE "_pages_v" ADD COLUMN "version_intro_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_image_position" "enum__pages_v_version_image_position" DEFAULT 'right';
  ALTER TABLE "pages" ADD CONSTRAINT "pages_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_intro_image_id_media_id_fk" FOREIGN KEY ("version_intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_intro_image_idx" ON "pages" USING btree ("intro_image_id");
  CREATE INDEX "_pages_v_version_version_intro_image_idx" ON "_pages_v" USING btree ("version_intro_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_intro_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_intro_image_id_media_id_fk";
  
  DROP INDEX "pages_intro_image_idx";
  DROP INDEX "_pages_v_version_version_intro_image_idx";
  ALTER TABLE "pages" DROP COLUMN "intro_image_id";
  ALTER TABLE "pages" DROP COLUMN "image_position";
  ALTER TABLE "_pages_v" DROP COLUMN "version_intro_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_image_position";
  DROP TYPE "public"."enum_pages_image_position";
  DROP TYPE "public"."enum__pages_v_version_image_position";`)
}
