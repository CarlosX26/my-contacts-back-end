import { DataSource, DataSourceOptions } from "typeorm"
import path from "path"
import AppError from "./errors/appError"
import "reflect-metadata"
import "dotenv/config"

const getDataSourceOptions = (): DataSourceOptions => {
  const DB_URL = process.env.POSTGRESQL_DB_URL
  const NODE_ENV = process.env.NODE_ENV
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}")
  const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}")

  if (!DB_URL) {
    throw new AppError("Need to pass a database URL.")
  }

  if (NODE_ENV === "tests") {
    return {
      type: "sqlite",
      database: ":memory:",
      entities: [entitiesPath],
      synchronize: true,
    }
  }

  return {
    type: "postgres",
    url: DB_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  }
}

const AppDataSource = new DataSource(getDataSourceOptions())

export default AppDataSource
