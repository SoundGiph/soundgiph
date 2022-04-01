import { SnakeNamingStrategy } from "./snake-naming-config";
import { ConnectionOptions } from "typeorm";

export const ORMConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [process.env.ENTITIES],
  migrationsTableName: "migration",
  synchronize: false,
  migrations: [process.env.MIGRATIONS],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
};

module.exports = ORMConfig;
