import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app/app.module';
import { SoundGifEntity } from '../../../src/sound-gif/core/domain/sound-gif.entity';
import { soundGifFixtureFactory } from '../../../src/sound-gif/core/domain/sound-gif.fixture.factory';

const soundGifFixtures = [
  soundGifFixtureFactory({ description: 'sch' }),
  soundGifFixtureFactory({ personalityName: 'hamza' }),
  soundGifFixtureFactory({ audioTitle: 'niska méchant' }),
  soundGifFixtureFactory({ description: 'sex' }),
  soundGifFixtureFactory({ description: 'bonjour' }),
];
describe('find sound gif controller', () => {
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
  it('should find sound gif with fulltext', async () => {
    const { body, error } = await request(app.getHttpServer())
      .post('/find')
      .send({ fulltext: 'nis' })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body.soundGifs).toBeDefined();
    expect(Boolean(body.soundGifs.length)).toBeTruthy();
    expect(body.soundGifs[0].audioTitle).toStrictEqual('niska méchant');
  });

  it('should find all sound gif without fulltext', async () => {
    const { body, error } = await request(app.getHttpServer())
      .post('/find')
      .send({ fulltext: '' })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body.soundGifs).toBeDefined();
    expect(body.soundGifs.length).toStrictEqual(5);
  });
});
