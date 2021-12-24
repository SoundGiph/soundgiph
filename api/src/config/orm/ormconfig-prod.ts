import { SnakeNamingStrategy } from './snake-naming-config';
import { ConnectionOptions } from 'typeorm';

export const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.ENV === 'test' ? 'localhost' : 'postgres',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
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
