import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { Connection } from "typeorm";
import * as uuid from "uuid";
import { AppModule } from "../../../src/app/app.module";
import { SoundGifEntity } from "../../../src/sound-gif/core/domain/sound-gif.entity";
import { soundGifFixtureFactory } from "../../../src/sound-gif/core/domain/sound-gif.fixture.factory";


const id = uuid.v4()
const soundGifFixtures = [
    soundGifFixtureFactory({ id: id as SoundGifEntity["id"], sharedCount: 0 }),
];

describe("increment a shared count", () => {
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
        await connection.getRepository(SoundGifEntity).save([...soundGifFixtures]);
    });

    afterAll(async () => {
        await app.close();
    });

    it("should increment the shared count", async () => {
        await request(app.getHttpServer())
            .post("/incrementSharedCount")
            .send({ id })
            .expect(201);
        const expectedSharedCount = 1;
        const { sharedCount } = await connection.getRepository(SoundGifEntity).findOne(id);
        expect(sharedCount).toBe(expectedSharedCount);
    });
});
