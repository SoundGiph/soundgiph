import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneOptions, ILike } from 'typeorm';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';
import { SoundGifPort } from '../../ports/sound-gif.ports';
import {
  FindOneSoundGifQueryResult,
  FindOneSoundGifQuery,
} from './find-one-sound-gif.query';

@QueryHandler(FindOneSoundGifQuery)
export class FindOneSoundGifQueryHandler
  implements IQueryHandler<FindOneSoundGifQuery>
{
  constructor(
    @Inject(SoundGifEntity)
    private readonly FindOneSoundGifPort: Pick<SoundGifPort, 'findOne'>,
  ) {}

  public async execute({
    payload,
  }: FindOneSoundGifQuery): Promise<FindOneSoundGifQueryResult> {
    const { id } = payload;
    const whereOptions: FindOneOptions = {
      where: {
        id,
      },
    };
    const soundGifs = await this.FindOneSoundGifPort.findOne(whereOptions);
    return new FindOneSoundGifQueryResult(soundGifs);
  }
}
