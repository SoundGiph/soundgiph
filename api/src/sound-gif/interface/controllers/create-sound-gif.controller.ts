import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandBus } from "@nestjs/cqrs";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import "multer";
import { Categories } from "src/sound-gif/core/domain/sound-gif.entity";
import { UserEntity } from "src/user/core/domain/user.entity";
import { AzureBlobStoragePresenter } from "../../../azure-blob-storage/interface/azure-blob-storage.presenter";
import {
  CreateSoundGifCommand,
  CreateSoundGifCommandResult,
} from "../../core/application/commands/create-sound-gif/create-sound-gif.command";
import {
  IncrementSharedCountCommand,
  IncrementSharedCountPayload,
} from "../../core/application/commands/increment-shared-count/increment-shared-count.command";

type CreateSoundGifRequestPayload = {
  title: string;
  description: string;
  tags: string[];
  reactions: string[];
  categories: Categories[];
  userId?: UserEntity["id"];
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
    private readonly azureStoragePresenter: AzureBlobStoragePresenter
  ) {}

  IMAGE_CONTAINER = this.configService.get<string>("AZURE_IMAGE_CONTAINER_NAME", "");

  SOUND_CONTAINER = this.configService.get<string>("AZURE_SOUND_CONTAINER_NAME", "");

  @Post("/createSoundGif")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "audioFile", maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles()
    files: CreateSoundGifRequestFilesPayload,
    @Body()
    payload: CreateSoundGifRequestPayload
  ): Promise<boolean> {
    try {
      const { audioFile, imageFile } = files;

      const audioUrl = await this.azureStoragePresenter.upload(audioFile, this.SOUND_CONTAINER);
      const imageUrl = await this.azureStoragePresenter.upload(imageFile, this.IMAGE_CONTAINER);
      const { createdSoundGif } = await this.commandBus.execute<
        CreateSoundGifCommand,
        CreateSoundGifCommandResult
      >(new CreateSoundGifCommand({ ...payload, audioUrl, imageUrl }));
      return Boolean(createdSoundGif.id);
    } catch (error) {
      throw new BadRequestException(
        `CreateSoundGifCommandHandler > fail > Invalid payload: ${JSON.stringify(payload)}`
      );
    }
  }

  @Post("/incrementSharedCount")
  async incrementSharedCount(
    @Body()
    payload: IncrementSharedCountPayload
  ): Promise<void> {
    try {
      await this.commandBus.execute<IncrementSharedCountCommand, void>(
        new IncrementSharedCountCommand(payload)
      );
    } catch (error) {
      throw new BadRequestException(`incrementSharedCount > fail > Unexpected Error: ${error}`);
    }
  }
}
