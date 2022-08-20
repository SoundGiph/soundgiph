import {MigrationInterface, QueryRunner} from "typeorm";

export class deviceIdCanBeNull1661002545465 implements MigrationInterface {
    name = 'deviceIdCanBeNull1661002545465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "device_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "device_id" SET NOT NULL`);
    }

}
