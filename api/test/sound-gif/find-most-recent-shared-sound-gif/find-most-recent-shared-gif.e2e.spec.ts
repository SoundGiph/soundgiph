import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app/app.module';
import { SoundGifEntity } from '../../../src/sound-gif/core/domain/sound-gif.entity';
import { soundGifFixtureFactory } from '../../../src/sound-gif/core/domain/sound-gif.fixture.factory';

const today = new Date();
const date = new Date();
const yesterday = new Date(date.setDate(date.getDate() - 7));
const soundGifFixtures = [
  soundGifFixtureFactory({
    createdAt: yesterday,
    description: 'sch',
  }),
  soundGifFixtureFactory({ createdAt: yesterday, personalityName: 'hamza' }),
  soundGifFixtureFactory({ createdAt: yesterday, audioTitle: 'niska méchant' }),
  soundGifFixtureFactory({ createdAt: yesterday, description: 'sex' }),
  soundGifFixtureFactory({ createdAt: today, description: 'bonjour' }),
];
describe('find most recent sound gif controller', () => {
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
  it('should find most recent sound gif', async () => {
    const { body, error } = await request(app.getHttpServer())
      .get('/findMostRecent')
      .expect(200);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(Boolean(body.length)).toBeTruthy();
    expect(body.length).toStrictEqual(5);
    expect(body[0].description).toStrictEqual('bonjour');
  });
});
