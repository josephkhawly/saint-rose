import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_visit" RENAME COLUMN "eyebrow" TO "title";
  ALTER TABLE "_pages_v_blocks_visit" RENAME COLUMN "eyebrow" TO "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_visit" RENAME COLUMN "title" TO "eyebrow";
  ALTER TABLE "_pages_v_blocks_visit" RENAME COLUMN "title" TO "eyebrow";`)
}
