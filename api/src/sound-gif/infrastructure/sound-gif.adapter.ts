import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SoundGifPort } from '../core/application/ports/sound-gif.ports';
import { SoundGifEntity } from '../core/domain/sound-gif.entity';

export class SoundGifAdapter implements SoundGifPort {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(SoundGifEntity)
    private readonly soundGifRepository: Repository<SoundGifEntity>,
  ) {}

  public async find(whereOptions: FindManyOptions): Promise<SoundGifEntity[]> {
    this.logger.log(
      `FindAddressAdapter > find > called with whereOptions: ${whereOptions}`,
    );
    return await this.soundGifRepository.find(whereOptions);
  }

  public async findMostRecent(): Promise<SoundGifEntity[]> {
    this.logger.log('FindAddressAdapter > findMostRecent > start');
    return await this.soundGifRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async findMostShared(): Promise<SoundGifEntity[]> {
    this.logger.log('FindAddressAdapter > findMostShared > start');
    return await this.soundGifRepository.find({
      order: {
        sharedCount: 'DESC',
      },
    });
  }
}
