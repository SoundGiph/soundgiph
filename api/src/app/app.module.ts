import { Module } from '@nestjs/common';
import { AppFeatureModule } from './app-feature.module';
import { BaseConfigImports } from './base-import';
@Module({
  imports: [...BaseConfigImports, AppFeatureModule],
})
export class AppModule {}
