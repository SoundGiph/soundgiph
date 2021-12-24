import { SnakeNamingStrategy } from './snake-naming-config';
import { ConnectionOptions } from 'typeorm';

export const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'soundgif',
  database: 'soundgif',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migration',
  migrations: ['dist/migration/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: 'dist/src/migration',
  },
};

module.exports = ORMConfig;
