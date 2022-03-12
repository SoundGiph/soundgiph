import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
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

const expectedCategories = ["sexy", "hot", "rap", "music", "cute"];
describe("get all categories", () => {
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
  it("should get all categories", async () => {
    const { body, error } = await request(app.getHttpServer()).get("/getAllCategories").expect(200);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(Boolean(body.length)).toBeTruthy();
    expect(body).toStrictEqual(expectedCategories);
  });
});
