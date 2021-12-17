import { Module } from '@nestjs/common';
import { AzureBlobStorageModule } from '../azure-blob-storage/azure-blob-storage.module';
import { SoundGifModule } from '../sound-gif/sound-gif.module';
@Module({
  imports: [SoundGifModule, AzureBlobStorageModule],
})
export class AppFeatureModule {}
