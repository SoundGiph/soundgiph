import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesEnumArray1650372016010 implements MigrationInterface {
    name = 'CategoriesEnumArray1650372016010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "categories"`);
        await queryRunner.query(`CREATE TYPE "public"."sound_gif_categories_enum" AS ENUM('News', 'Anime', 'Movies', 'Cartoons', 'Gaming', 'Comedy', 'Social', 'Memes', 'Music', 'Sport', 'TV')`);
        await queryRunner.query(`ALTER TABLE "sound_gif" ADD "categories" "public"."sound_gif_categories_enum" NOT NULL DEFAULT 'Comedy'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sound_gif" DROP COLUMN "categories"`);
        await queryRunner.query(`DROP TYPE "public"."sound_gif_categories_enum"`);
        await queryRunner.query(`ALTER TABLE "sound_gif" ADD "categories" text NOT NULL`);
    }

}
