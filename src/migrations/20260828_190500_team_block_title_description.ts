import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" ADD COLUMN "block_title" varchar;
  ALTER TABLE "pages_blocks_team" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "block_title" varchar;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "description" varchar;
  UPDATE "pages_blocks_team" SET "block_title" = 'Meet The Team' WHERE "block_title" IS NULL;
  UPDATE "pages_blocks_team" SET "description" = 'Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you vibe with? Let us know when you book and we''ll make the match.' WHERE "description" IS NULL;
  UPDATE "_pages_v_blocks_team" SET "block_title" = 'Meet The Team' WHERE "block_title" IS NULL;
  UPDATE "_pages_v_blocks_team" SET "description" = 'Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you vibe with? Let us know when you book and we''ll make the match.' WHERE "description" IS NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" DROP COLUMN "block_title";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "block_title";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "description";`)
}
