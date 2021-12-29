import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneOptions, ILike } from 'typeorm';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';
import { SoundGifPort } from '../../ports/sound-gif.ports';
import {
  GetOneSoundGifQueryResult,
  GetOneSoundGifQuery,
} from './find-one-sound-gif.query';

@QueryHandler(GetOneSoundGifQuery)
export class GetOneSoundGifQueryHandler
  implements IQueryHandler<GetOneSoundGifQuery>
{
  constructor(
    @Inject(SoundGifEntity)
    private readonly GetOneSoundGifPort: Pick<SoundGifPort, 'getOne'>,
  ) {}

  public async execute({
    payload,
  }: GetOneSoundGifQuery): Promise<GetOneSoundGifQueryResult> {
    const { id } = payload;
    const whereOptions: FindOneOptions = {
      where: {
        id,
      },
    };
    const soundGifs = await this.GetOneSoundGifPort.getOne(whereOptions);
    return new GetOneSoundGifQueryResult(soundGifs);
  }
}
