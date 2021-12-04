import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SoundGifPort } from '../core/application/ports/sound-gif.ports';
import { SoundGifEntity } from '../core/domain/sound-gif.entity';

export class SoundGifAdapter implements SoundGifPort {
  private readonly logger = new Logger();
  constructor(
    private readonly soundGifRepository: Repository<SoundGifEntity>,
  ) {}

  public async find(fulltext: string): Promise<SoundGifEntity[]> {
    this.logger.error(`FindAddressAdapter > called with fulltext: ${fulltext}`);
    return await this.soundGifRepository
      .createQueryBuilder()
      .select()
      .where('description ILIKE :searchTerm', { searchTerm: `%${fulltext}%` })
      .andWhere('personalityName ILIKE :searchTerm', {
        searchTerm: `%${fulltext}%`,
      })
      .andWhere('audioTitle ILIKE :searchTerm', {
        searchTerm: `%${fulltext}%`,
      })
      .getMany();
  }
}
