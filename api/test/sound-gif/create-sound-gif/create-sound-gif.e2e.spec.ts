import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";
import * as request from "supertest";
import { Connection } from "typeorm";
import { AppModule } from "../../../src/app/app.module";
import { Categories } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { UserEntity } from "../../../src/user/core/domain/user.entity";
import { userFixtureFactory } from "../../../src/user/core/domain/user.fixture-factory";

const audioFile = `${__dirname}/snoop-dogg.mp3`;
const imageFile = `${__dirname}/snoop-dogg.jpeg`;
const tags = ["rap", "snoop", "dogg"];
describe("create sound gif controller", () => {
  let app: NestApplication;
  let userId: UserEntity["id"];
  let connection: Connection;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = app.get(Connection);
    await connection.synchronize(true);
    const user = userFixtureFactory({});
    userId = user.id;
    await connection.getRepository(UserEntity).save(user);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create sound gif", async () => {
    const { body, error } = await request(app.getHttpServer())
      .post("/createSoundGif")
      .field("title", faker.random.word())
      .field("tags", tags)
      .field("description", "snoop dogg sound")
      .field("categories", ["Music", "TV"])
      .field("reactions", ["fun"])
      .field("userId", userId)
      .attach("audioFile", audioFile)
      .attach("imageFile", imageFile)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body).toBeTruthy();
    console.log(body);
  });
  it("should create sound gif", async () => {
    const { body, error } = await request(app.getHttpServer())
      .post("/createSoundGif")
      .field("title", faker.random.word())
      .field("tags", tags)
      .field("description", "snoop dogg sound")
      .field("categories", "{Music}")
      .field("reactions", ["fun"])
      .field("userId", userId)
      .attach("audioFile", audioFile)
      .attach("imageFile", imageFile)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body).toBeTruthy();
  });
  it("should create sound gif", async () => {
    const { error } = await request(app.getHttpServer())
      .post("/createSoundGif")
      .field("title", faker.random.word())
      .field("tags", tags)
      .field("description", "snoop dogg sound")
      .field("categories", ["Music"])
      .field("userId", userId)
      .field("reactions", ["fun"])
      .attach("audioFile", audioFile)
      .attach("imageFile", imageFile)
      .expect(400);
    expect(error).toBeDefined();
  });

  it("should not create sound gif", async () => {
    const { error } = await request(app.getHttpServer())
      .post("/createSoundGif")
      .field("title", faker.random.word())
      .field("tags", tags)
      .field("userId", userId)
      .field("description", "snoop dogg sound")
      .field("categories", [Categories.Music, "NonValidCategory"])
      .field("reactions", ["fun"])
      .attach("audioFile", audioFile)
      .attach("imageFile", imageFile)
      .expect(400);
    expect(error).toBeDefined();
  });

  it("should find the new sound gif", async () => {
    const { body, error } = await request(app.getHttpServer())
      .post("/findSoundGif")
      .send({ fulltext: "snoop" })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body).toBeTruthy();
    expect(body[0].description).toStrictEqual("snoop dogg sound");
  });
});
