import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';
import { SoundGifPort } from '../../ports/sound-gif.ports';
import { FindMostSharedSoundGifQuery } from './find-most-shared-sound-gif.query';

@QueryHandler(FindMostSharedSoundGifQuery)
export class FindMostSharedSoundGifQueryHandler
  implements IQueryHandler<FindMostSharedSoundGifQuery>
{
  constructor(
    @Inject(SoundGifEntity)
    private readonly findSoundGifPort: Pick<SoundGifPort, 'findMostShared'>,
  ) {}

  public async execute(): Promise<SoundGifEntity[]> {
    return await this.findSoundGifPort.findMostShared();
  }
}
