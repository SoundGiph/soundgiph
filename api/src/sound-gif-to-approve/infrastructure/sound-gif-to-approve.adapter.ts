import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SoundGifToApprovePort } from "../core/application/port/sound-gif-to-approve.port";
import { SoundGifToApproveEntity } from "../core/domain/sound-gif-to-approve.entity";

@Injectable()
export class SoundGifToApproveAdapter implements SoundGifToApprovePort {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(SoundGifToApproveEntity)
    private readonly soundGifToApproveRepository: Repository<SoundGifToApproveEntity>
  ) {}

  public async create(payload: Partial<SoundGifToApproveEntity>): Promise<SoundGifToApproveEntity> {
    this.logger.log(`SoundGifAdapter > create > called with ${payload}`);
    return await this.soundGifToApproveRepository.create(payload).save();
  }
}
