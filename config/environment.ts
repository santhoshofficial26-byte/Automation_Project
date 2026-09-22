import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  STANDARD_USER: process.env.STANDARD_USER || 'standard_user',
  PASSWORD: process.env.PASSWORD || 'secret_sauce',
};