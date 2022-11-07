import {MigrationInterface, QueryRunner} from "typeorm";

export class addGoogleProvider1658672224528 implements MigrationInterface {
    name = 'addGoogleProvider1658672224528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "google_payload" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "google_payload"`);
    }

}
