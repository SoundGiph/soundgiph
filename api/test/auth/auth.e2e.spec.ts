import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app/app.module";
import * as request from "supertest";

describe("create sound gif controller", () => {
  let app: NestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create sound gif", async () => {
    const { body, error } = await request(app.getHttpServer()).post("/auth").expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body).toBeTruthy();
  });
});
