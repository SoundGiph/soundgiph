import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app/app.module';
import { SoundGifEntity } from '../../../src/sound-gif/core/domain/sound-gif.entity';
import { soundGifFixtureFactory } from '../../../src/sound-gif/core/domain/sound-gif.fixture.factory';

const soundGifFixtures = [
  soundGifFixtureFactory({ description: 'sch' }),
  soundGifFixtureFactory({ tags: ['hamza', 'rap'] }),
  soundGifFixtureFactory({ title: 'niska méchant' }),
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
      .post('/findSoundGif')
      .send({ fulltext: 'nisk' })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(Boolean(body.length)).toBeTruthy();
    expect(body[0].title).toStrictEqual('niska méchant');
  });

  it('should find all sound gif without fulltext', async () => {
    const { body, error } = await request(app.getHttpServer())
      .post('/findSoundGif')
      .send({ fulltext: '' })
      .expect(201);
    expect(error).toBeFalsy();
    expect(body).toBeDefined();
    expect(body.length).toStrictEqual(5);
  });
});
