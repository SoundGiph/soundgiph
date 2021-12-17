import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app/app.module';
import * as fs from 'fs';
const audioFile = `${__dirname}/snoop-dogg.mp3`;
const imageFile = `${__dirname}/snoop-dogg.jpeg`;

describe('create sound gif controller', () => {
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
  it('should create sound gif', async () => {
    const { body, error } = await request(app.getHttpServer())
      .post('/createSoundGif')
      .field('title', 'snoop dogg')
      .field('description', 'snoop dogg sound')
      .attach('audioFile', audioFile)
      .attach('imageFile', imageFile)
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body).toBeTruthy();
  });
});
