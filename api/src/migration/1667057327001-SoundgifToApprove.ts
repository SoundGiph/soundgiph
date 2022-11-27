import {MigrationInterface, QueryRunner} from "typeorm";

export class SoundgifToApprove1667057327001 implements MigrationInterface {
    name = 'SoundgifToApprove1667057327001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sound_gif_to_approve" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL DEFAULT '1', "description" character varying NOT NULL, "title" character varying NOT NULL, "audio_url" character varying NOT NULL, "image_url" character varying NOT NULL, "added_by" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_586f7a8c137efc1141bc4a6ba09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e25684d61ec9841493a16e0cb" ON "sound_gif_to_approve" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_72e050dafcc09a17b85e19a030" ON "sound_gif_to_approve" ("title") `);
        await queryRunner.query(`ALTER TABLE "sound_gif_to_approve" ADD CONSTRAINT "FK_8958d99df847c233422292e411f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif_to_approve" DROP CONSTRAINT "FK_8958d99df847c233422292e411f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72e050dafcc09a17b85e19a030"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e25684d61ec9841493a16e0cb"`);
        await queryRunner.query(`DROP TABLE "sound_gif_to_approve"`);
    }

}
