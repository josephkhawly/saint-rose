import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_banner_with_text" RENAME COLUMN "image_id" TO "banner_id";
  ALTER TABLE "_pages_v_blocks_banner_with_text" RENAME COLUMN "image_id" TO "banner_id";
  ALTER TABLE "pages_blocks_banner_with_text" DROP CONSTRAINT "pages_blocks_banner_with_text_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_banner_with_text" DROP CONSTRAINT "_pages_v_blocks_banner_with_text_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_banner_with_text_image_idx";
  DROP INDEX "_pages_v_blocks_banner_with_text_image_idx";
  ALTER TABLE "pages_blocks_banner_with_text" ADD CONSTRAINT "pages_blocks_banner_with_text_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_with_text" ADD CONSTRAINT "_pages_v_blocks_banner_with_text_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_banner_with_text_banner_idx" ON "pages_blocks_banner_with_text" USING btree ("banner_id");
  CREATE INDEX "_pages_v_blocks_banner_with_text_banner_idx" ON "_pages_v_blocks_banner_with_text" USING btree ("banner_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_banner_with_text" RENAME COLUMN "banner_id" TO "image_id";
  ALTER TABLE "_pages_v_blocks_banner_with_text" RENAME COLUMN "banner_id" TO "image_id";
  ALTER TABLE "pages_blocks_banner_with_text" DROP CONSTRAINT "pages_blocks_banner_with_text_banner_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_banner_with_text" DROP CONSTRAINT "_pages_v_blocks_banner_with_text_banner_id_media_id_fk";
  
  DROP INDEX "pages_blocks_banner_with_text_banner_idx";
  DROP INDEX "_pages_v_blocks_banner_with_text_banner_idx";
  ALTER TABLE "pages_blocks_banner_with_text" ADD CONSTRAINT "pages_blocks_banner_with_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_banner_with_text" ADD CONSTRAINT "_pages_v_blocks_banner_with_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_banner_with_text_image_idx" ON "pages_blocks_banner_with_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_banner_with_text_image_idx" ON "_pages_v_blocks_banner_with_text" USING btree ("image_id");`)
}
