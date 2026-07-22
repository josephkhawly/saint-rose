import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_and_text_column_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_and_text_column_image_position" AS ENUM('left', 'right');
  CREATE TABLE "pages_blocks_image_and_text_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"link" varchar,
  	"link_label" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_image_and_text_column_image_position" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_and_text_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"link" varchar,
  	"link_label" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_image_and_text_column_image_position" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_image_and_text_column" ADD CONSTRAINT "pages_blocks_image_and_text_column_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_and_text_column" ADD CONSTRAINT "pages_blocks_image_and_text_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_and_text_column" ADD CONSTRAINT "_pages_v_blocks_image_and_text_column_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_and_text_column" ADD CONSTRAINT "_pages_v_blocks_image_and_text_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_and_text_column_order_idx" ON "pages_blocks_image_and_text_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_and_text_column_parent_id_idx" ON "pages_blocks_image_and_text_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_and_text_column_path_idx" ON "pages_blocks_image_and_text_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_and_text_column_image_idx" ON "pages_blocks_image_and_text_column" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_and_text_column_order_idx" ON "_pages_v_blocks_image_and_text_column" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_and_text_column_parent_id_idx" ON "_pages_v_blocks_image_and_text_column" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_and_text_column_path_idx" ON "_pages_v_blocks_image_and_text_column" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_and_text_column_image_idx" ON "_pages_v_blocks_image_and_text_column" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_image_and_text_column" CASCADE;
  DROP TABLE "_pages_v_blocks_image_and_text_column" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_image_and_text_column_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_image_and_text_column_image_position";`)
}
