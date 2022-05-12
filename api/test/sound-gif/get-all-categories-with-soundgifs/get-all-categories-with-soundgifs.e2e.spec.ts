import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesWithSoundGifs } from "src/sound-gif/core/application/queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "../../../src/app/app.module";
import { Categories, SoundGifEntity } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { soundGifFixtureFactory } from "../../../src/sound-gif/core/domain/sound-gif.fixture.factory";

const generateBigFixtures = (): SoundGifEntity[] => {
  const fixtures = [];
  for (let i = 0; i < 40; i++) {
    fixtures.push(soundGifFixtureFactory({ categories: [Categories.Anime] }));
    fixtures.push(soundGifFixtureFactory({ categories: [Categories.Gaming] }));
  }
  return fixtures;
};

const soundGifFixtures = [
  soundGifFixtureFactory({ description: "sch", categories: [Categories.Music] }),
  soundGifFixtureFactory({ tags: ["hamza", "rap"], categories: [Categories.Music] }),
  soundGifFixtureFactory({ title: "niska méchant", categories: [Categories.Music] }),
  soundGifFixtureFactory({ description: "sex", categories: [Categories.Movies] }),
  soundGifFixtureFactory({ description: "bonjour", categories: [Categories.Music] }),
];

const bigFixtures = generateBigFixtures();
const musicCategoryLength = 4;
const movieCategoryLength = 1;
const maxLength = 20;

describe("get all categories with soundgifs", () => {
  let app: NestApplication;
  let connection: Connection;
  let soundgifsWithCategories: CategoriesWithSoundGifs[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = app.get(Connection);
    await connection.synchronize(true);
    await connection.getRepository(SoundGifEntity).save([...soundGifFixtures, ...bigFixtures]);
    const { body } = await request(app.getHttpServer())
      .get("/getAllCategoriesWithSoundGifs")
      .expect(200);
    soundgifsWithCategories = body;
  });

  afterAll(async () => {
    await app.close();
  });

  it.each([
    [Categories.Anime, maxLength],
    [Categories.Gaming, maxLength],
    ["mostShared", maxLength],
    ["mostRecent", maxLength],
    [Categories.Music, musicCategoryLength],
    [Categories.Movies, movieCategoryLength],
  ])("category %s should return %s items", async (categoryName, expectedLength) => {
    const currentCategory = soundgifsWithCategories.filter(
      (item: CategoriesWithSoundGifs) => item.name === categoryName
    );
    expect(currentCategory[0].soundGifs).toHaveLength(expectedLength);
  });
});
