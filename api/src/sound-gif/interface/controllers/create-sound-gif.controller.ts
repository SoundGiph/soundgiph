import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import 'multer';
import { AzureBlobStoragePresenter } from '../../../azure-blob-storage/interface/azure-blob-storage.presenter';
import {
  CreateSoundGifCommand,
  CreateSoundGifCommandResult,
} from '../../core/application/commands/create-sound-gif/create-sound-gif.command';

type CreateSoundGifRequestPayload = {
  title: string;
  description: string;
  tags: string[];
};

type CreateSoundGifRequestFilesPayload = {
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
};

@Controller()
export class CreateSoundGifController {
  constructor(
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
    private readonly azureStoragePresenter: AzureBlobStoragePresenter, //TODO: pourquoi ne pas avoir utiliser le decorator Injector() ?
  ) {}

  IMAGE_CONTAINER = this.configService.get<string>(
    'AZURE_IMAGE_CONTAINER_NAME',
    '',
  );

  SOUND_CONTAINER = this.configService.get<string>(
    'AZURE_SOUND_CONTAINER_NAME',
    '',
  );

  @Post('/createSoundGif')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile', maxCount: 1 },
      { name: 'audioFile', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: CreateSoundGifRequestFilesPayload,
    @Body()
    payload: CreateSoundGifRequestPayload,
  ): Promise<boolean> {
    try {
      const { title, description, tags } = payload;
      const { audioFile, imageFile } = files;

      const audioUrl = await this.azureStoragePresenter.upload(
        audioFile,
        this.SOUND_CONTAINER,
      );
      const imageUrl = await this.azureStoragePresenter.upload(
        imageFile,
        this.IMAGE_CONTAINER,
      );
      const { createdSoundGif } = await this.commandBus.execute<
        CreateSoundGifCommand,
        CreateSoundGifCommandResult
      >(
        new CreateSoundGifCommand({
          title,
          description,
          tags,
          audioUrl,
          imageUrl,
        }),
      );
      return Boolean(createdSoundGif.id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
