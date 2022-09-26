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
import { UserEntity } from "src/user/core/domain/user.entity";
import { AzureBlobStoragePresenter } from "../../azure-blob-storage/interface/azure-blob-storage.presenter";
import {
  CreateSoundGifToApproveCommand,
  CreateSoundGifToApproveCommandResult,
} from "../core/application/commands/create-sound-gif-to-approve/create-sound-gif-to-approve.command";

type CreateSoundGifToApproveRequestPayload = {
  title: string;
  description: string;
  addedBy: UserEntity["id"];
};

type CreateSoundGifToApproveRequestFilesPayload = {
  audioFile: Express.Multer.File;
  imageFile: Express.Multer.File;
};

@Controller()
export class CreateSoundGifToApproveController {
  constructor(
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
    private readonly azureStoragePresenter: AzureBlobStoragePresenter
  ) {}

  IMAGE_CONTAINER = this.configService.get<string>("AZURE_IMAGE_CONTAINER_NAME", "");

  SOUND_CONTAINER = this.configService.get<string>("AZURE_SOUND_CONTAINER_NAME", "");

  @Post("/createSoundGifToApprove")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "audioFile", maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles()
    files: CreateSoundGifToApproveRequestFilesPayload,
    @Body()
    payload: CreateSoundGifToApproveRequestPayload
  ): Promise<boolean> {
    try {
      const { audioFile, imageFile } = files;
      const audioUrl = await this.azureStoragePresenter.upload(audioFile, this.SOUND_CONTAINER);
      const imageUrl = await this.azureStoragePresenter.upload(imageFile, this.IMAGE_CONTAINER);
      const { createdSoundGifToApprove } = await this.commandBus.execute<
        CreateSoundGifToApproveCommand,
        CreateSoundGifToApproveCommandResult
      >(new CreateSoundGifToApproveCommand({ ...payload, audioUrl, imageUrl }));
      return Boolean(createdSoundGifToApprove.id);
    } catch (error) {
      throw new BadRequestException(
        `CreateSoundGifToApproveCommandHandler > fail > Invalid payload: ${JSON.stringify(payload)}`
      );
    }
  }
}
