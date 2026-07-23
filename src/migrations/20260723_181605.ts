import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_banner_with_text" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_banner_with_text" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_banner_with_text" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_banner_with_text" ADD COLUMN "title" varchar;`)
}
