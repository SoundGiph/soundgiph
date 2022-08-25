import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app/app.module";

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
});
