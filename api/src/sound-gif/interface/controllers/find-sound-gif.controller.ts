import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import 'multer';
import {
  FindOneSoundGifQuery,
  FindOneSoundGifQueryResult,
} from '../../core/application/queries/find-one-sound-gif/find-one-sound-gif.query';
import {
  FindMostRecentSoundGifQuery,
  FindMostRecentSoundGifQueryResult,
} from '../../core/application/queries/find-most-recent-sound-gif/find-most-recent-sound-gif.query';
import {
  FindMostSharedSoundGifQuery,
  FindMostSharedSoundGifQueryResult,
} from '../../core/application/queries/find-most-shared-sound-gif/find-most-shared-sound-gif.query';
import {
  FindSoundGifPayload,
  FindSoundGifQuery,
  FindSoundGifQueryResult,
} from '../../core/application/queries/find-sound-gif/find-sound-gif.query';
import { SoundGifEntity } from '../../core/domain/sound-gif.entity';
@Controller()
export class FindSoundGifController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/findSoundGif')
  async find(@Body() payload: FindSoundGifPayload): Promise<SoundGifEntity[]> {
    const { fulltext } = payload;
    const { soundGifs } = await this.queryBus.execute<
      FindSoundGifQuery,
      FindSoundGifQueryResult
    >(
      new FindSoundGifQuery({
        fulltext,
      }),
    );
    return soundGifs;
  }

  @Get('/findMostRecentSoundGif')
  async findMostRecent(): Promise<SoundGifEntity[]> {
    const { soundGifs } = await this.queryBus.execute<
      FindMostRecentSoundGifQuery,
      FindMostRecentSoundGifQueryResult
    >(new FindMostRecentSoundGifQuery());
    return soundGifs;
  }

  @Get('/findMostSharedSoundGif')
  async findMostShared(): Promise<SoundGifEntity[]> {
    const { soundGifs } = await this.queryBus.execute<
      FindMostSharedSoundGifQuery,
      FindMostSharedSoundGifQueryResult
    >(new FindMostSharedSoundGifQuery());
    return soundGifs;
  }

  @Get('/findOneSoundGif/:id')
  async findOne(
    @Param('id') id: SoundGifEntity['id'],
  ): Promise<SoundGifEntity> {
    const { soundGif } = await this.queryBus.execute<
      FindOneSoundGifQuery,
      FindOneSoundGifQueryResult
    >(new FindOneSoundGifQuery({ id }));
    return soundGif;
  }
}
