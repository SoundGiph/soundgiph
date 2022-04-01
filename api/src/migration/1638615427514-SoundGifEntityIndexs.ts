import { MigrationInterface, QueryRunner } from "typeorm";

export class SoundGifEntityIndexs1638615427514 implements MigrationInterface {
  name = "SoundGifEntityIndexs1638615427514";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "IDX_9862709cb9e70c422430fe05e4" ON "sound_gif" ("description") `);
    await queryRunner.query(`CREATE INDEX "IDX_abb3204e63906c57cf4fc30ec4" ON "sound_gif" ("personality_name") `);
    await queryRunner.query(`CREATE INDEX "IDX_abe75d82c147b91b59dc1ee3ba" ON "sound_gif" ("audio_title") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_abe75d82c147b91b59dc1ee3ba"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_abb3204e63906c57cf4fc30ec4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9862709cb9e70c422430fe05e4"`);
  }
}
