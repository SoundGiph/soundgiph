import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntityV21661096739625 implements MigrationInterface {
    name = 'UserEntityV21661096739625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tiktok_payload"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "apple_payload"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "google_payload"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider_id" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('GOOGLE', 'APPLE', 'TIKTOK')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" "public"."user_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "google_payload" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "apple_payload" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tiktok_payload" character varying`);
    }

}
