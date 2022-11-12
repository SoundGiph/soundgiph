import {MigrationInterface, QueryRunner} from "typeorm";

export class SoundgifToApproveRemoveAddedBy1668258828365 implements MigrationInterface {
    name = 'SoundgifToApproveRemoveAddedBy1668258828365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif_to_approve" DROP COLUMN "added_by"`);
        await queryRunner.query(`ALTER TABLE "sound_gif" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sound_gif" ADD CONSTRAINT "FK_ad69f777f39b3531a6a45de5b1e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif" DROP CONSTRAINT "FK_ad69f777f39b3531a6a45de5b1e"`);
        await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "sound_gif_to_approve" ADD "added_by" character varying NOT NULL`);
    }

}
