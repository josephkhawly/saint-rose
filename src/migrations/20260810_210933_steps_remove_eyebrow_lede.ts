import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_steps" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_steps" DROP COLUMN "lede";
  ALTER TABLE "_pages_v_blocks_steps" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_steps" DROP COLUMN "lede";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_steps" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_steps" ADD COLUMN "lede" varchar;
  ALTER TABLE "_pages_v_blocks_steps" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_steps" ADD COLUMN "lede" varchar;`)
}
