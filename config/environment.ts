import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  USERNAME: process.env.USERNAME || 'standard_user',
  PASSWORD: process.env.PASSWORD || 'secret_sauce',
};