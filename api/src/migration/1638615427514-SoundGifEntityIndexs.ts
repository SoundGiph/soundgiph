import {MigrationInterface, QueryRunner} from "typeorm";

export class SoundGifEntityIndexs1638615427514 implements MigrationInterface {
    name = 'SoundGifEntityIndexs1638615427514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sound_gif" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL DEFAULT '1', "description" character varying, "personality_name" character varying, "audio_title" character varying NOT NULL, "audio_url" character varying NOT NULL, "image_url" character varying NOT NULL, "shared_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e41f5b08f3aaed2323a5a36e9d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9862709cb9e70c422430fe05e4" ON "sound_gif" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_abb3204e63906c57cf4fc30ec4" ON "sound_gif" ("personality_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_abe75d82c147b91b59dc1ee3ba" ON "sound_gif" ("audio_title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_abe75d82c147b91b59dc1ee3ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abb3204e63906c57cf4fc30ec4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9862709cb9e70c422430fe05e4"`);
        await queryRunner.query(`DROP TABLE "sound_gif"`);
    }

}
