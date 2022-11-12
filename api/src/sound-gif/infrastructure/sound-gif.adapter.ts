import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from "lodash";
import { UserEntity } from "src/user/core/domain/user.entity";
import { Repository } from "typeorm";
import { IncrementSharedCountPayload } from "../core/application/commands/increment-shared-count/increment-shared-count.command";
import { SoundGifPort } from "../core/application/ports/sound-gif.ports";
import { FindSoundGifPayload } from "../core/application/queries/find-sound-gif/find-sound-gif.query";
import { SoundGifEntity, SoundGifEntityMandatoryFields } from "../core/domain/sound-gif.entity";
import { searchSoundGifQuery } from "./utils/searchSoundGifQueryBuilder";
export class SoundGifAdapter implements SoundGifPort {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(SoundGifEntity)
    private readonly soundGifRepository: Repository<SoundGifEntity>
  ) {}

  private shuffleSoundGifs(soundgifs: SoundGifEntity[]): SoundGifEntity[] {
    return _.shuffle(soundgifs);
  }

  public async find(payload: FindSoundGifPayload): Promise<SoundGifEntity[]> {
    const { filters, fulltext } = payload;
    const soundGifs = await searchSoundGifQuery(this.soundGifRepository, filters, fulltext);
    return this.shuffleSoundGifs(soundGifs);
  }

  public async getAllCategories(): Promise<string[]> {
    this.logger.log("SoundGifAdapter > getAllCategories > start");
    const allSoundGifs = await this.soundGifRepository.find({});
    const allCategories = allSoundGifs.map(soundGif => soundGif.categories).flat();
    const allCategoriesWithoutDuplicatedValues = Array.from(new Set(allCategories)).sort();
    return allCategoriesWithoutDuplicatedValues;
  }

  public async create(
    payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields,
    userId: UserEntity["id"]
  ): Promise<SoundGifEntity> {
    this.logger.log(`SoundGifAdapter > create > called with ${payload} and user: ${userId}`);
    return await this.soundGifRepository.create({ ...payload, user: { id: userId } }).save();
  }

  public async incrementSharedCount(payload: IncrementSharedCountPayload): Promise<void> {
    this.logger.log(`SoundGifAdapter > incrementSharedCount > called with ${payload}`);
    const soundGif = await this.soundGifRepository.findOne(payload.id);
    soundGif.sharedCount++;
    await this.soundGifRepository.save(soundGif);
  }
}
