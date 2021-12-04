import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindMostRecentSoundGifQuery } from '../core/application/queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query';
import { FindSoundGifQuery } from '../core/application/queries/find-sound-gif/find-sound-gif.query';
import { SoundGifEntity } from '../core/domain/sound-gif.entity';

@Controller()
export class SoundGifController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/find')
  async find(@Body() fulltext: string): Promise<SoundGifEntity> {
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
}
