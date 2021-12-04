import { SnakeNamingStrategy } from './snake-naming-config';
import { ConnectionOptions } from 'typeorm';

console.log(__dirname);
export const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'soundgif',
  password: 'soundgif',
  database: 'soundgif',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: 'src/migration',
  },
};

module.exports = ORMConfig;
