import { SnakeNamingStrategy } from './snake-naming-config';
import { ConnectionOptions } from 'typeorm';

export const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.ENV === 'test' ? 'localhost' : 'postgres',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.ENV === 'test' ? 'soundgif-test' : 'soundgif',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: 'src/migration',
  },
};

module.exports = ORMConfig;
