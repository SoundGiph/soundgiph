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
      host: configService.get('POSTGRES_HOST', 'localhost'),
      port: configService.get<number>('POSTGRES_PORT', 5432),
      username: configService.get('POSTGRES_USER', 'postgres'),
      password: configService.get('POSTGRES_PASSWORD', 'soundgif'),
      database:
        configService.get('ENV', 'development') === 'test'
          ? configService.get('POSTGRES_TEST_DATABASE', 'soundgif-test')
          : configService.get('POSTGRES_DATABASE', 'soundgif'),
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      namingStrategy: new SnakeNamingStrategy(),
      cli: {
        migrationsDir: 'src/migration',
      },
    }),
  }),
];
