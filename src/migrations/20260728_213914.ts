import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_visit_accent_color" AS ENUM('rose', 'deep-rose', 'dark-chocolate', 'mint', 'lavender', 'sky', 'garden', 'olive', 'lima');
  CREATE TYPE "public"."enum__pages_v_blocks_visit_accent_color" AS ENUM('rose', 'deep-rose', 'dark-chocolate', 'mint', 'lavender', 'sky', 'garden', 'olive', 'lima');
  CREATE TABLE "pages_blocks_visit_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"times" varchar
  );
  
  CREATE TABLE "pages_blocks_visit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Visit Us',
  	"lede" varchar,
  	"accent_color" "enum_pages_blocks_visit_accent_color" DEFAULT 'rose',
  	"address_line1" varchar DEFAULT '3316 Mount Vernon St',
  	"address_line2" varchar DEFAULT 'Houston, TX 77006',
  	"map_link" varchar DEFAULT 'https://maps.google.com/?q=3316+Mount+Vernon+St,+Houston,+TX+77006',
  	"phone" varchar DEFAULT '346 802 2183',
  	"email" varchar DEFAULT 'info@hairbysaintrose.com',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_visit_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"days" varchar,
  	"times" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_visit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Visit Us',
  	"lede" varchar,
  	"accent_color" "enum__pages_v_blocks_visit_accent_color" DEFAULT 'rose',
  	"address_line1" varchar DEFAULT '3316 Mount Vernon St',
  	"address_line2" varchar DEFAULT 'Houston, TX 77006',
  	"map_link" varchar DEFAULT 'https://maps.google.com/?q=3316+Mount+Vernon+St,+Houston,+TX+77006',
  	"phone" varchar DEFAULT '346 802 2183',
  	"email" varchar DEFAULT 'info@hairbysaintrose.com',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_visit_hours" ADD CONSTRAINT "pages_blocks_visit_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_visit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visit" ADD CONSTRAINT "pages_blocks_visit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit_hours" ADD CONSTRAINT "_pages_v_blocks_visit_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_visit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit" ADD CONSTRAINT "_pages_v_blocks_visit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_visit_hours_order_idx" ON "pages_blocks_visit_hours" USING btree ("_order");
  CREATE INDEX "pages_blocks_visit_hours_parent_id_idx" ON "pages_blocks_visit_hours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visit_order_idx" ON "pages_blocks_visit" USING btree ("_order");
  CREATE INDEX "pages_blocks_visit_parent_id_idx" ON "pages_blocks_visit" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visit_path_idx" ON "pages_blocks_visit" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_visit_hours_order_idx" ON "_pages_v_blocks_visit_hours" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_visit_hours_parent_id_idx" ON "_pages_v_blocks_visit_hours" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_order_idx" ON "_pages_v_blocks_visit" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_visit_parent_id_idx" ON "_pages_v_blocks_visit" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_path_idx" ON "_pages_v_blocks_visit" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_visit_hours" CASCADE;
  DROP TABLE "pages_blocks_visit" CASCADE;
  DROP TABLE "_pages_v_blocks_visit_hours" CASCADE;
  DROP TABLE "_pages_v_blocks_visit" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_visit_accent_color";
  DROP TYPE "public"."enum__pages_v_blocks_visit_accent_color";`)
}
