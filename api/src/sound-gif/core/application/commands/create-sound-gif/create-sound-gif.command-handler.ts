import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Categories, SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { CreateSoundGifCommand, CreateSoundGifCommandResult } from "./create-sound-gif.command";

@CommandHandler(CreateSoundGifCommand)
export class CreateSoundGifCommandHandler implements ICommandHandler<CreateSoundGifCommand> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly createSoundGifPort: Pick<SoundGifPort, "create">
  ) {}

  private checkCategoriesBeforeUpload = (categories: Categories[]): boolean => {
    categories.forEach(category => {
      if (!Object.values(Categories).includes(category)) return false;
    });
    return true;
  };

  public async execute({ payload }: CreateSoundGifCommand): Promise<CreateSoundGifCommandResult> {
    if (!this.checkCategoriesBeforeUpload(payload.categories)) {
      throw new BadRequestException(
        `CreateSoundGifCommandHandler > fail >Invalid Category in payload.categories: ${payload.categories}`
      );
    }
    const createdSoundGif = await this.createSoundGifPort.create(payload);
    return new CreateSoundGifCommandResult(createdSoundGif);
  }
}
