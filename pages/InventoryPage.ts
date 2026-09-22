import { Page, expect } from '@playwright/test';
import { inventoryLocators } from '../locators/inventoryLocators';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyOnInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
}

  async addBackpackToCart() {
    await this.page.locator(inventoryLocators.addBackpackButton).click();
  }

  async verifyBackpackButtonText(expectedText: string) {
    if (expectedText === 'Remove') {
      await expect(this.page.locator(inventoryLocators.removeBackpackButton)).toBeVisible();
    } else {
      await expect(this.page.locator(inventoryLocators.addBackpackButton)).toBeVisible();
    }
  }

  async verifyCartCount(expectedCount: string) {
    const badge = this.page.locator(inventoryLocators.shoppingCartBadge);
    await expect(badge).toHaveText(expectedCount);
  }

  async verifyCartBadgeNotVisible() {
    await expect(this.page.locator(inventoryLocators.shoppingCartBadge)).not.toBeVisible();
  }

  async openMenu() {
    await this.page.locator(inventoryLocators.menuButton).click();
    await this.page.locator(inventoryLocators.logoutLink).waitFor({ state: 'visible' });
  }

  async clickLogout() {
    await this.page.locator(inventoryLocators.logoutLink).click();
  }

  async selectSortOption(optionValue: string) {
    await this.page.locator(inventoryLocators.sortDropdown).selectOption(optionValue);
  }

  async verifyPriceOrderAscending() {
    const priceElements = await this.page.locator(inventoryLocators.inventoryItemPrices).allTextContents();
    const prices = priceElements.map((p) => parseFloat(p.replace('$', '').trim()));
    expect(prices[0]).toBe(7.99);
    expect(prices[prices.length - 1]).toBe(49.99);
  }

  async addMultipleProducts() {
    await this.page.locator(inventoryLocators.addBackpackButton).click();
    await this.page.locator(inventoryLocators.addBikeLightButton).click();
    await this.page.locator(inventoryLocators.addBoltTShirtButton).click();
  }

  async clickCartIcon() {
    await this.page.locator(inventoryLocators.shoppingCartLink).click();
  }

  async resetAppState() {
    await this.page.locator(inventoryLocators.resetAppStateLink).click();
  }

  async closeMenu() {
    await this.page.locator(inventoryLocators.menuCloseButton).click();
  }

  async openBackpackDetail() {
    await this.page.locator(inventoryLocators.backpackTitle).click();
  }
}