import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCategoriesEnumArrayTrue1651185281433 implements MigrationInterface {
    name = 'MakeCategoriesEnumArrayTrue1651185281433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "categories"`);
        await queryRunner.query(`DROP TYPE "public"."sound_gif_categories_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."sound_gif_categories_enum" AS ENUM('News', 'Anime', 'Movies', 'Cartoons', 'Gaming', 'Comedy', 'Social', 'Memes', 'Music', 'Sports', 'TV')`);
        await queryRunner.query(`ALTER TABLE "sound_gif" ADD "categories" "public"."sound_gif_categories_enum" array NOT NULL DEFAULT '{Comedy}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "categories"`);
        await queryRunner.query(`CREATE TYPE "public"."sound_gif_categories_enum" AS ENUM('News', 'Anime', 'Movies', 'Cartoons', 'Gaming', 'Comedy', 'Social', 'Memes', 'Music', 'Sports', 'TV')`);
        await queryRunner.query(`ALTER TABLE "sound_gif" ADD "categories" "public"."sound_gif_categories_enum" NOT NULL DEFAULT 'Comedy'`);
    }

}
