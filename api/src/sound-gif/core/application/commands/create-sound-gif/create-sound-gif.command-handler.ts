import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AzureBlobStoragePresenter } from '../../../../../azure-blob-storage/interface/azure-blob-storage.presenter';
import { SoundGifEntity } from '../../../domain/sound-gif.entity';
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
    @Inject(SoundGifEntity)
    private readonly createSoundGifPort: Pick<SoundGifPort, 'create'>,
  ) {}

  public async execute({
    payload,
  }: CreateSoundGifCommand): Promise<CreateSoundGifCommandResult> {
    const { title, audioUrl, imageUrl, description, personalityName } = payload;
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
