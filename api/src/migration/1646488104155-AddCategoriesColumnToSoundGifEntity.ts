import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoriesColumnToSoundGifEntity1646488104155 implements MigrationInterface {
  name = "AddCategoriesColumnToSoundGifEntity1646488104155";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sound_gif" ADD "categories" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "categories"`);
  }
}
