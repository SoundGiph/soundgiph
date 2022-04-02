import { MigrationInterface, QueryRunner } from 'typeorm';

export class SoundGifEntity1638614713773 implements MigrationInterface {
  name = 'SoundGifEntity1638614713773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sound_gif" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL DEFAULT '1', "description" character varying, "personality_name" character varying, "audio_title" character varying NOT NULL, "audio_url" character varying NOT NULL, "image_url" character varying NOT NULL, "shared_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e41f5b08f3aaed2323a5a36e9d2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sound_gif"`);
  }
}
