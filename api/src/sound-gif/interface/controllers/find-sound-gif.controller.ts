import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import 'multer';
import { FindMostRecentSoundGifQuery } from '../../core/application/queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query';
import { FindMostSharedSoundGifQuery } from '../../core/application/queries/find-most-shared-sound-gif/find-most-shared-sound-gif.query';
import {
  FindSoundGifPayload,
  FindSoundGifQuery,
} from '../../core/application/queries/find-sound-gif/find-sound-gif.query';
import { SoundGifEntity } from '../../core/domain/sound-gif.entity';

@Controller()
export class FindSoundGifController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/find')
  async find(@Body() payload: FindSoundGifPayload): Promise<SoundGifEntity> {
    const { fulltext } = payload;
    return await this.queryBus.execute<FindSoundGifQuery>(
      new FindSoundGifQuery({
        fulltext,
      }),
    );
  }

  @Get('/findMostRecent')
  async findMostRecent(): Promise<SoundGifEntity> {
    return await this.queryBus.execute<FindMostRecentSoundGifQuery>(
      new FindMostRecentSoundGifQuery(),
    );
  }

  @Get('/findMostShared')
  async findMostShared(): Promise<SoundGifEntity> {
    return await this.queryBus.execute<FindMostSharedSoundGifQuery>(
      new FindMostSharedSoundGifQuery(),
    );
  }
}
