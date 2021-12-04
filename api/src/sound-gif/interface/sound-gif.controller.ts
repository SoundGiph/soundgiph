import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
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
}
