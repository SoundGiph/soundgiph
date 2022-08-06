import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SoundGifEntity } from "../../../domain/sound-gif.entity";
import { SoundGifPort } from "../../ports/sound-gif.ports";
import { CreateSoundGifCommand, CreateSoundGifCommandResult } from "./create-sound-gif.command";

@CommandHandler(CreateSoundGifCommand)
export class CreateSoundGifCommandHandler implements ICommandHandler<CreateSoundGifCommand> {
  constructor(
    @Inject(SoundGifEntity)
    private readonly createSoundGifPort: Pick<SoundGifPort, "create">
  ) {}

  public async execute({ payload }: CreateSoundGifCommand): Promise<CreateSoundGifCommandResult> {
    const createdSoundGif = await this.createSoundGifPort.create(payload);
    return new CreateSoundGifCommandResult(createdSoundGif);
  }
}
