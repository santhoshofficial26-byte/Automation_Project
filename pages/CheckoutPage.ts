import { Page, expect } from '@playwright/test';
import { checkoutLocators } from '../locators/checkoutLocators';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyStepOneURL() {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(checkoutLocators.firstNameInput).fill(firstName);
    await this.page.locator(checkoutLocators.lastNameInput).fill(lastName);
    await this.page.locator(checkoutLocators.postalCodeInput).fill(postalCode);
  }

  async clickContinue() {
    await this.page.locator(checkoutLocators.continueButton).click();
  }

  async verifyStepTwoURL() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  async clickFinish() {
    await this.page.locator(checkoutLocators.finishButton).click();
  }

  async verifyOrderSuccess() {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.page.locator(checkoutLocators.completeHeader)).toContainText('Thank you for your order!');
  }
}