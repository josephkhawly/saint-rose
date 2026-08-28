import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services" DROP COLUMN "columns";
  ALTER TABLE "pages_blocks_services" ADD COLUMN "disclaimer" varchar;
  ALTER TABLE "_pages_v_blocks_services" DROP COLUMN "columns";
  ALTER TABLE "_pages_v_blocks_services" ADD COLUMN "disclaimer" varchar;
  UPDATE "pages_blocks_services" SET "disclaimer" = 'Prices shown are starting rates and vary based on the level of the stylist.' WHERE "disclaimer" IS NULL;
  UPDATE "_pages_v_blocks_services" SET "disclaimer" = 'Prices shown are starting rates and vary based on the level of the stylist.' WHERE "disclaimer" IS NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services" DROP COLUMN "disclaimer";
  ALTER TABLE "pages_blocks_services" ADD COLUMN "columns" numeric DEFAULT 2;
  ALTER TABLE "_pages_v_blocks_services" DROP COLUMN "disclaimer";
  ALTER TABLE "_pages_v_blocks_services" ADD COLUMN "columns" numeric DEFAULT 2;`)
}
