import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { FindSoundGifPayload } from "src/sound-gif/core/application/queries/find-sound-gif/find-sound-gif.query";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "../../../src/app/app.module";
import { Categories, SoundGifEntity } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { soundGifFixtureFactory } from "../../../src/sound-gif/core/domain/sound-gif.fixture.factory";

const soundGifFixtures = [
  soundGifFixtureFactory({ description: "sch", categories: [Categories.Music, Categories.Social] }),
  soundGifFixtureFactory({
    tags: ["hamza", "rap"],
    categories: [Categories.Music, Categories.Comedy],
  }),
  soundGifFixtureFactory({
    title: "niska méchant",
    categories: [Categories.Music, Categories.Social],
  }),
  soundGifFixtureFactory({ description: "sex", categories: [Categories.TV] }),
  soundGifFixtureFactory({ description: "bonjour", categories: [Categories.Cartoons] }),
  soundGifFixtureFactory({
    description: "ONE PIECE",
    categories: [Categories.Anime, Categories.Cartoons],
  }),
  soundGifFixtureFactory({
    description: "Naruto",
    categories: [Categories.Anime, Categories.Memes],
  }),
];
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
      await connection.getRepository(SoundGifEntity).save(soundGifFixtures);
    }
  });

  afterAll(async () => {
    await app.close();
  });
  it("should find sound gif with fulltext", async () => {
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send({ fulltext: "nisk" })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(Boolean(body.length)).toBeTruthy();
    expect(body[0].title).toStrictEqual("niska méchant");
  });

  it("should find all sound gif without fulltext", async () => {
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send({})
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(soundGifFixtures.length);
  });

  it("should find all sound gif with categories", async () => {
    const params: FindSoundGifPayload = { filters: { category: Categories.Anime } };
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send(params)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(2);
  });

  it("should find sound gif with categories and fulltext", async () => {
    const params: FindSoundGifPayload = {
      filters: { category: Categories.Anime },
      fulltext: "ONE P",
    };
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send(params)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(1);
  });

  it("should find sound gif with category most recent", async () => {
    const params: FindSoundGifPayload = {
      filters: { mostRecent: true },
    };
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send(params)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(soundGifFixtures.length);
  });

  it("should find sound gif with category most shared", async () => {
    const params: FindSoundGifPayload = {
      filters: { mostShared: true },
    };
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send(params)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(soundGifFixtures.length);
  });
});
