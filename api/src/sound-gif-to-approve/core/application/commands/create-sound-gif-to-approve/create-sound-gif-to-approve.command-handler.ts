import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AzureBlobStoragePresenter } from "../../../../../azure-blob-storage/interface/azure-blob-storage.presenter";
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
  logger = new Logger();
  constructor(
    @Inject(SoundGifToApproveEntity)
    private readonly createSoundGifPort: Pick<SoundGifToApprovePort, "create">,
    private readonly azureStoragePresenter: AzureBlobStoragePresenter,
    private readonly configService: ConfigService
  ) {}

  IMAGE_CONTAINER = this.configService.get<string>("AZURE_IMAGE_CONTAINER_NAME", "");

  SOUND_CONTAINER = this.configService.get<string>("AZURE_SOUND_CONTAINER_NAME", "");

  public async execute({
    payload,
  }: CreateSoundGifToApproveCommand): Promise<CreateSoundGifToApproveCommandResult> {
    try {
      this.logger.log(
        `CreateSoundGifToApproveCommandHandler > started with payload > ${JSON.stringify(
          payload
        )} > and files > ${JSON.stringify(payload)}`
      );
      const { audioFile, imageFile, title, description, user } = payload;
      const audioUrl = await this.azureStoragePresenter.upload(audioFile, this.SOUND_CONTAINER);
      const imageUrl = await this.azureStoragePresenter.upload(imageFile, this.IMAGE_CONTAINER);
      await this.createSoundGifPort.create({
        imageUrl,
        audioUrl,
        title,
        description,
        user,
      });
      return true;
    } catch (error) {
      this.logger.error(`CreateSoundGifToApproveCommandHandler > fail >  ${JSON.stringify(error)}`);
      return false;
    }
  }
}
