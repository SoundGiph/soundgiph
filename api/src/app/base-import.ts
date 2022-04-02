import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../config/orm/snake-naming-config';

export const BaseConfigImports = [
  ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST', 'postgres'),
      port: configService.get<number>('POSTGRES_PORT', 5432),
      username: configService.get('POSTGRES_USER', 'postgres'),
      password: configService.get('POSTGRES_PASSWORD', ''),
      database: configService.get('POSTGRES_DATABASE', 'soundgif'),
      entities: [configService.get('ENTITIES', '')],
      synchronize: false,
      migrationsTableName: 'migration',
      migrations: [configService.get('MIGRATIONS', '')],
      namingStrategy: new SnakeNamingStrategy(),
      cli: {
        migrationsDir: configService.get('MIGRATIONS_DIR', ''),
      },
    }),
  }),
];
