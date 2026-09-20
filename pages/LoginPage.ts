import { Page, expect } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string = '/') {
    await this.page.goto(url);
  }

  async enterUsername(username: string) {
    await this.page.locator(loginLocators.usernameInput).fill(username);
  }

  async enterPassword(password: string) {
    await this.page.locator(loginLocators.passwordInput).fill(password);
  }

  async clickLogin() {
    await this.page.locator(loginLocators.loginButton).click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyErrorMessage(expectedText: string) {
    await expect(this.page.locator(loginLocators.errorMessage)).toContainText(expectedText);
  }
}