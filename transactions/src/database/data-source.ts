import { DataSource } from 'typeorm';
import { dbUri, dbLogging } from '../common/constants/env-variables';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: dbUri,
  synchronize: false,
  logging: dbLogging === 'true',
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  entities: [`${__dirname}/../modules/**/*.entity.{js,ts}`],
  subscribers: []
});
