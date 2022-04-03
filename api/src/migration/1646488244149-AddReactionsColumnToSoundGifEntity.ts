import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReactionsColumnToSoundGifEntity1646488244149 implements MigrationInterface {
  name = "AddReactionsColumnToSoundGifEntity1646488244149";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sound_gif" ADD "reactions" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "reactions"`);
  }
}
