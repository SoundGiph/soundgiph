import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app/app.module';
import { SoundGifEntity } from '../../../src/sound-gif/core/domain/sound-gif.entity';
import { soundGifFixtureFactory } from '../../../src/sound-gif/core/domain/sound-gif.fixture.factory';

const soundGifFixtures = [
  soundGifFixtureFactory({ sharedCount: 5, description: 'sch' }),
  soundGifFixtureFactory({ sharedCount: 4, personalityName: 'hamza' }),
  soundGifFixtureFactory({ sharedCount: 3, audioTitle: 'niska méchant' }),
  soundGifFixtureFactory({ sharedCount: 2, description: 'sex' }),
  soundGifFixtureFactory({ description: 'bonjour' }),
];
describe('find most shared sound gif controller', () => {
  let app: NestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    if (process.env.NODE_ENV === 'test') {
      connection = app.get(Connection);
      await connection.synchronize(true);
      await connection.getRepository(SoundGifEntity).save(soundGifFixtures);
    }
  });

  afterAll(async () => {
    await app.close();
  });
  it('should find most shared sound gif', async () => {
    const { body, error } = await request(app.getHttpServer())
      .get('/findMostShared')
      .expect(200);
    expect(error).toBeFalsy();
    expect(body.soundGifs).toBeDefined();
    expect(Boolean(body.soundGifs.length)).toBeTruthy();
    expect(body.soundGifs.length).toStrictEqual(5);
    expect(body.soundGifs[0].description).toStrictEqual('sch');
  });
});
