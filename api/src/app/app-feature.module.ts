import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AzureBlobStorageModule } from "../azure-blob-storage/azure-blob-storage.module";
import { soundGifToApproveModule } from "../sound-gif-to-approve/sound-gif-to-approve.module";
import { SoundGifModule } from "../sound-gif/sound-gif.module";
import { UserModule } from "../user/user.module";
@Module({
  imports: [
    SoundGifModule,
    AzureBlobStorageModule,
    UserModule,
    AuthModule,
    soundGifToApproveModule,
  ],
})
export class AppFeatureModule {}
