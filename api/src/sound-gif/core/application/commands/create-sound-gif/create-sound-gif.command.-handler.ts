import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AzureStoragePresenter } from '../../../../../azure-blob-storage/interface/azure-blob-storage.presenter';
import { SoundGifPort } from '../../ports/sound-gif.ports';
import {
  CreateSoundGifCommand,
  CreateSoundGifCommandResult,
} from './create-sound-gif.command';

@CommandHandler(CreateSoundGifCommand)
export class CreateSoundGifCommandHandler
  implements ICommandHandler<CreateSoundGifCommand>
{
  constructor(
    private readonly configService: ConfigService,
    private readonly createSoundGifPort: Pick<SoundGifPort, 'create'>,
    private readonly azureStoragePresenter: AzureStoragePresenter,
  ) {}

  IMAGE_CONTAINER = this.configService.get<string>(
    'AZURE_IMAGE_CONTAINER_NAME',
    '',
  );

  SOUND_CONTAINER = this.configService.get<string>(
    'AZURE_SOUND_CONTAINER_NAME',
    '',
  );

  public async execute({
    payload,
  }: CreateSoundGifCommand): Promise<CreateSoundGifCommandResult> {
    const { title, audioFile, imageFile, description, personalityName } =
      payload;
    const audioUrl = await this.azureStoragePresenter.upload(
      audioFile,
      title,
      this.SOUND_CONTAINER,
    );
    const imageUrl = await this.azureStoragePresenter.upload(
      imageFile,
      title,
      this.IMAGE_CONTAINER,
    );
    const createdSoundGif = await this.createSoundGifPort.create({
      title,
      audioUrl,
      imageUrl,
      description,
      personalityName,
    });
    return new CreateSoundGifCommandResult(createdSoundGif);
  }
}
