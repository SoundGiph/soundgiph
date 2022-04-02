import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesWithSoundGifs } from "src/sound-gif/core/application/queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "../../../src/app/app.module";
import { SoundGifEntity } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { soundGifFixtureFactory } from "../../../src/sound-gif/core/domain/sound-gif.fixture.factory";

const soundGifFixtures = [
  soundGifFixtureFactory({ description: "sch", categories: ["rap", "music"] }),
  soundGifFixtureFactory({ tags: ["hamza", "rap"], categories: ["rap", "music"] }),
  soundGifFixtureFactory({ title: "niska méchant", categories: ["rap", "music"] }),
  soundGifFixtureFactory({ description: "sex", categories: ["sexy", "hot"] }),
  soundGifFixtureFactory({ description: "bonjour", categories: ["cute", "music"] }),
];

const expectedCategories = ["cute", "hot", "music", "rap", "sexy"];
const sexyCategoryLength = 1;
const hotCategoryLength = 1;
const cuteCategoryLength = 1;
const musicCategoryLength = 4;
const rapCategoryLength = 3;

const expectCategoriesLength = (name: string, soundgifs: SoundGifEntity[]) => {
  if (name === "cute") expect(soundgifs.length).toStrictEqual(cuteCategoryLength);
  if (name === "hot") expect(soundgifs.length).toStrictEqual(hotCategoryLength);
  if (name === "music") expect(soundgifs.length).toStrictEqual(musicCategoryLength);
  if (name === "rap") expect(soundgifs.length).toStrictEqual(rapCategoryLength);
  if (name === "sexy") expect(soundgifs.length).toStrictEqual(sexyCategoryLength);
};

describe("get all categories with soundgifs", () => {
  let app: NestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = app.get(Connection);
    await connection.synchronize(true);
    await connection.getRepository(SoundGifEntity).save(soundGifFixtures);
  });

  afterAll(async () => {
    await app.close();
  });
  it("should get all categories with soundgifs", async () => {
    const { body, error } = await request(app.getHttpServer()).get("/getAllCategoriesWithSoundGifs").expect(200);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(Boolean(body.length)).toBeTruthy();
    expect(body.length).toStrictEqual(expectedCategories.length);
    body.map((categoryWithSoundgifs: CategoriesWithSoundGifs) => {
      const { name, soundGifs: soundgifs } = categoryWithSoundgifs;
      expectCategoriesLength(name, soundgifs);
    });
  });
});
