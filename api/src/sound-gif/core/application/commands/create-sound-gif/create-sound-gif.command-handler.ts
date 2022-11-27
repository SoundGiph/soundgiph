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
    const { userId } = payload;
    delete payload.userId;
    const createdSoundGif = await this.createSoundGifPort.create(payload, userId);
    console.log(createdSoundGif);
    return new CreateSoundGifCommandResult(createdSoundGif);
  }
}
