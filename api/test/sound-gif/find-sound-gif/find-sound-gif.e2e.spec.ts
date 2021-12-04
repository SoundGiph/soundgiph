import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AppModule } from '../../../src/app/app.module';
import { SoundGifEntity } from '../../../src/sound-gif/core/domain/sound-gif.entity';
import { soundGifFixtureFactory } from '../../../src/sound-gif/core/domain/sound-gif.fixture.factory';
import { SoundGifAdapter } from '../../../src/sound-gif/infrastructure/sound-gif.adapter';

const soundGifFixtures = [
  soundGifFixtureFactory({ description: 'sch' }),
  soundGifFixtureFactory({ personalityName: 'hamza' }),
  soundGifFixtureFactory({ audioTitle: 'niska méchant' }),
  soundGifFixtureFactory({ description: 'sex' }),
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

    if (process.env.NODE_ENV !== 'production') {
      connection = app.get(Connection);
      await connection.synchronize(true);
      await connection.getRepository(SoundGifEntity).save(soundGifFixtures);
    }
  });

  afterAll(async () => {
    await app.close();
  });
  it('should find sound gif', async () => {
    const response = await request(app.getHttpServer())
      .post('/find')
      .send({ fulltext: 'sch' })
      .expect(200);
  });
});
