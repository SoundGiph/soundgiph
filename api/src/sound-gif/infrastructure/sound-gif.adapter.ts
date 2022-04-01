import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { SoundGifPort } from "../core/application/ports/sound-gif.ports";
import { FindSoundGifPayload } from "../core/application/queries/find-sound-gif/find-sound-gif.query";
import { CategoriesWithSoundgifs } from "../core/application/queries/get-all-categories-with-soundgifs/get-all-categories-with-soundgifs.command";
import { SoundGifEntity, SoundGifEntityMandatoryFields } from "../core/domain/sound-gif.entity";
import { searchSoundGifQuery } from "./utils/searchSoundGifQueryBuilder";

export class SoundGifAdapter implements SoundGifPort {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(SoundGifEntity)
    private readonly soundGifRepository: Repository<SoundGifEntity>
  ) {}

  public async find(payload: FindSoundGifPayload): Promise<SoundGifEntity[]> {
    const { fulltext, filters } = payload;
    this.logger.log(`SoundGifAdapter > find > called with fulltext: ${fulltext} and filters: ${filters}`);
    return await searchSoundGifQuery(this.soundGifRepository, filters, fulltext);
  }

  public async findMostRecent(): Promise<SoundGifEntity[]> {
    this.logger.log("SoundGifAdapter > findMostRecent > start");
    return await this.soundGifRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  public async getOne(whereOptions: FindOneOptions): Promise<SoundGifEntity> {
    this.logger.log("SoundGifAdapter > getOne > start");
    return await this.soundGifRepository.findOne(whereOptions);
  }

  public async findMostShared(): Promise<SoundGifEntity[]> {
    this.logger.log("SoundGifAdapter > findMostShared > start");
    return await this.soundGifRepository.find({
      order: {
        sharedCount: "DESC",
      },
    });
  }

  public async getAllCategories(): Promise<string[]> {
    this.logger.log("SoundGifAdapter > getAllCategories > start");
    const allSoundGifs = await this.soundGifRepository.find({});
    const allCategories = allSoundGifs.map(soundGif => soundGif.categories).flat();
    const allCategoriesWithoutDuplicatedValues = Array.from(new Set(allCategories));
    return allCategoriesWithoutDuplicatedValues;
  }

  public async getAllCategoriesWithSoundGifs(): Promise<CategoriesWithSoundgifs[]> {
    const categories = await this.getAllCategories();
    const categoriesWithSoundgifs = Promise.all(
      categories.map(async category => {
        return {
          [category]: await this.find({ filters: { category, limit: 20 } }),
        };
      })
    );
    return categoriesWithSoundgifs;
  }

  public async create(payload: Partial<SoundGifEntity> & SoundGifEntityMandatoryFields): Promise<SoundGifEntity> {
    this.logger.log(`SoundGifAdapter > create > called with ${payload}`);
    return await this.soundGifRepository.create(payload).save();
  }
}
