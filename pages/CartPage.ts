import { Page, expect } from '@playwright/test';
import { cartLocators } from '../locators/cartLocators';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyItemCount(count: number) {
    await expect(this.page.locator(cartLocators.cartItem)).toHaveCount(count);
  }

  async removeBoltTShirt() {
    await this.page.locator(cartLocators.removeBoltTShirtButton).click();
  }

  async verifyCartCount(expectedCount: string) {
    await expect(this.page.locator(cartLocators.cartBadge)).toHaveText(expectedCount);
  }

  async clickCheckout() {
    await this.page.locator(cartLocators.checkoutButton).click();
  }
}