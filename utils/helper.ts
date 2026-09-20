import { Page } from '@playwright/test';

export class Helper {
  static async getCleanPrice(priceText: string): Promise<number> {
    return parseFloat(priceText.replace('$', '').trim());
  }
}