import { MigrationInterface, QueryRunner } from 'typeorm';

export class SoundGifEntityRemovePersonalityNameByTags1639786201494
  implements MigrationInterface
{
  name = 'SoundGifEntityRemovePersonalityNameByTags1639786201494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_abb3204e63906c57cf4fc30ec4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sound_gif" DROP COLUMN "personality_name"`,
    );
    await queryRunner.query(`ALTER TABLE "sound_gif" ADD "tags" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "sound_gif" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_81958da8b9c3f94f95adeb9d7f" ON "sound_gif" ("tags") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_81958da8b9c3f94f95adeb9d7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sound_gif" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "tags"`);
    await queryRunner.query(
      `ALTER TABLE "sound_gif" ADD "personality_name" character varying`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_abb3204e63906c57cf4fc30ec4" ON "sound_gif" ("personality_name") `,
    );
  }
}
