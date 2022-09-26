import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SoundGifToApproveEntity } from "../../../domain/sound-gif-to-approve.entity";
import { SoundGifToApprovePort } from "../../port/sound-gif-to-approve.port";
import {
  CreateSoundGifToApproveCommand,
  CreateSoundGifToApproveCommandResult,
} from "./create-sound-gif-to-approve.command";

@CommandHandler(CreateSoundGifToApproveCommand)
export class CreateSoundGifToApproveCommandHandler
  implements ICommandHandler<CreateSoundGifToApproveCommand>
{
  constructor(
    @Inject(SoundGifToApproveEntity)
    private readonly createSoundGifPort: Pick<SoundGifToApprovePort, "create">
  ) {}

  public async execute({
    payload,
  }: CreateSoundGifToApproveCommand): Promise<CreateSoundGifToApproveCommandResult> {
    const createdSoundGif = await this.createSoundGifPort.create(payload);
    return new CreateSoundGifToApproveCommandResult(createdSoundGif);
  }
}
