/*
 * @Author: Yu Chen
 * @Date: 2018-11-01 22:10:25
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-02 14:20:09
 */

export const env = {
  SOURCE_PATH: process.env.NODE_ENV === 'production' ? 'dist' : 'src',
  IP: process.env.IP || '127.0.0.1',
  DOMAIN: process.env.DOMAIN || 'localhost',
  PORT: ~~process.env.PORT || 3000,
  PG_HOST: process.env.PG_HOST || '127.0.0.1',
  PG_PORT: ~~process.env.PG_PORT || 5432,
  PG_USERNAME: process.env.PG_USERNAME || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || '',
  PG_DATABASE: process.env.PG_DATABASE || 'postgres',
};
