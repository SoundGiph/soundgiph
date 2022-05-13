import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "../../../src/app/app.module";
import { Categories, SoundGifEntity } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { soundGifFixtureFactory } from "../../../src/sound-gif/core/domain/sound-gif.fixture.factory";

export const generateBigFixtures = (): SoundGifEntity[] => {
  const fixtures = [];
  for (let i = 0; i < 60; i++) {
    fixtures.push(soundGifFixtureFactory({ categories: [Categories.Anime] }));
  }
  return fixtures;
};

describe("find sound gif controller", () => {
  let app: NestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    if (process.env.NODE_ENV === "test") {
      connection = app.get(Connection);
      await connection.synchronize(true);
      await connection.getRepository(SoundGifEntity).save(generateBigFixtures());
    }
  });

  afterAll(async () => {
    await app.close();
  });
  it("should return max number of 50 soundgifs", async () => {
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send({ filters: { category: Categories.Anime } })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(50);
  });
});
