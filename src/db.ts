/*
 * @Author: Yu Chen
 * @Date: 2018-11-01 22:11:11
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 14:21:37
 */

import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env';

export const db = TypeOrmModule.forRoot({
  type: 'postgres',
  host: env.PG_HOST,
  port: env.PG_PORT,
  username: env.PG_USERNAME,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  entities: [`${env.SOURCE_PATH}/**/**.entity{.ts,.js}`],
  subscribers: [`${env.SOURCE_PATH}/**/**.subscriber{.ts,.js}`],
  synchronize: true,
  logging: ['error'],
  logger: 'advanced-console',
  maxQueryExecutionTime: 1000,
});
