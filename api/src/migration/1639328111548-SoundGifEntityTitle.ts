import { MigrationInterface, QueryRunner } from 'typeorm';

export class SoundGifEntityTitle1639328111548 implements MigrationInterface {
  name = 'SoundGifEntityTitle1639328111548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_abe75d82c147b91b59dc1ee3ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sound_gif" RENAME COLUMN "audio_title" TO "title"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ce9f43044940d514de5691563" ON "sound_gif" ("title") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7ce9f43044940d514de5691563"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sound_gif" RENAME COLUMN "title" TO "audio_title"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_abe75d82c147b91b59dc1ee3ba" ON "sound_gif" ("audio_title") `,
    );
  }
}
