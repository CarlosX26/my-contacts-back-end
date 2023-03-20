import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import AppError from "./errors/appError";
import "reflect-metadata";
import "dotenv/config";

const getDataSourceOptions = (): DataSourceOptions => {
  const DB_URL = process.env.POSTGRESQL_DB_URL;

  if (!DB_URL) {
    throw new AppError("Need to pass a database URL.");
  }

  return {
    type: "postgres",
    url: DB_URL,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "./migrations/**.{js,ts}")],
    migrations: [path.join(__dirname, "./entities/**.{js,ts}")],
  };
};

const AppDataSource = new DataSource(getDataSourceOptions());

export default AppDataSource;
