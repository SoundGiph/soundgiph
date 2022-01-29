import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindManyOptions, ILike } from 'typeorm';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';
import { SoundGifPort } from '../../ports/sound-gif.ports';
import {
  FindSoundGifQueryResult,
  FindSoundGifQuery,
} from './find-sound-gif.query';

@QueryHandler(FindSoundGifQuery)
export class FindSoundGifQueryHandler
  implements IQueryHandler<FindSoundGifQuery>
{
  constructor(
    @Inject(SoundGifEntity)
    private readonly findSoundGifPort: Pick<SoundGifPort, 'find'>,
  ) {}

  public async execute({
    payload,
  }: FindSoundGifQuery): Promise<FindSoundGifQueryResult> {
    const { fulltext } = payload;
    const descriptionSearchWhereOptions: FindManyOptions = Boolean(fulltext)
      ? {
          where: [{ description: ILike(`%${fulltext}%`) }],
        }
      : {};

    const tagsSearchWhereOptions: FindManyOptions = Boolean(fulltext)
      ? {
          where: {
            tags: ILike(`%${fulltext}%`),
          },
        }
      : {};

    const resultByDescriptionSoundGifs = await this.findSoundGifPort.find(
      descriptionSearchWhereOptions,
    );

    const resultByTagsSoundGifs = await this.findSoundGifPort.find(
      tagsSearchWhereOptions,
    );

    return new FindSoundGifQueryResult(
      resultByTagsSoundGifs.concat(resultByDescriptionSoundGifs),
    );
  }
}
