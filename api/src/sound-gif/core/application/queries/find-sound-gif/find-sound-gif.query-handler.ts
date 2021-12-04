import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';
import { SoundGifPort } from '../../ports/sound-gif.ports';
import { FindSoundGifQuery } from './find-sound-gif.query';

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
  }: FindSoundGifQuery): Promise<SoundGifEntity[]> {
    const { fulltext } = payload;
    return await this.findSoundGifPort.find(fulltext);
  }
}
