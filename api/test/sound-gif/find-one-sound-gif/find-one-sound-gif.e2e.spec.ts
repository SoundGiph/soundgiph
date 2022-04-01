import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "../../../src/app/app.module";
import { SoundGifEntity } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { soundGifFixtureFactory } from "../../../src/sound-gif/core/domain/sound-gif.fixture.factory";
import * as uuid from "uuid";

const soundGifId = uuid.v4();

const soundGifFixtures = [
  soundGifFixtureFactory({
    id: soundGifId as SoundGifEntity["id"],
    description: "sch",
  }),
  soundGifFixtureFactory({
    id: uuid.v4() as SoundGifEntity["id"],
    tags: ["hamza", "rap"],
  }),
  soundGifFixtureFactory({
    id: uuid.v4() as SoundGifEntity["id"],
    title: "niska méchant",
  }),
  soundGifFixtureFactory({
    id: uuid.v4() as SoundGifEntity["id"],
    description: "sex",
  }),
  soundGifFixtureFactory({
    id: uuid.v4() as SoundGifEntity["id"],
    description: "bonjour",
  }),
];
describe("find one onesound gif controller", () => {
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
      await connection.getRepository(SoundGifEntity).save(soundGifFixtures);
    }
  });

  afterAll(async () => {
    await app.close();
  });
  it("should find one onesound gif with fulltext", async () => {
    const { body, error } = await request(app.getHttpServer()).get(`/getOneSoundGif/${soundGifId}`).expect(200);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.description).toStrictEqual("sch");
  });
});
