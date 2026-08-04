import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff_member" DROP CONSTRAINT "staff_member_photo_large_id_media_id_fk";
  
  ALTER TABLE "staff_member" DROP CONSTRAINT "staff_member_video_id_media_id_fk";
  
  DROP INDEX "staff_member_photo_large_idx";
  DROP INDEX "staff_member_video_idx";
  ALTER TABLE "staff_member" DROP COLUMN "photo_large_id";
  ALTER TABLE "staff_member" DROP COLUMN "display_type";
  ALTER TABLE "staff_member" DROP COLUMN "bio";
  ALTER TABLE "staff_member" DROP COLUMN "video_id";
  DROP TYPE "public"."enum_staff_member_display_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_staff_member_display_type" AS ENUM('bio', 'video');
  ALTER TABLE "staff_member" ADD COLUMN "photo_large_id" integer;
  ALTER TABLE "staff_member" ADD COLUMN "display_type" "enum_staff_member_display_type" DEFAULT 'bio' NOT NULL;
  ALTER TABLE "staff_member" ADD COLUMN "bio" varchar;
  ALTER TABLE "staff_member" ADD COLUMN "video_id" integer;
  ALTER TABLE "staff_member" ADD CONSTRAINT "staff_member_photo_large_id_media_id_fk" FOREIGN KEY ("photo_large_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff_member" ADD CONSTRAINT "staff_member_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "staff_member_photo_large_idx" ON "staff_member" USING btree ("photo_large_id");
  CREATE INDEX "staff_member_video_idx" ON "staff_member" USING btree ("video_id");`)
}
