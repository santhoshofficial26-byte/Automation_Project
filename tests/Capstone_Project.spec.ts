import { test, expect } from '../fixtures/customFixture';
import { ENV } from '../config/environment';
import * as testData from '../test-data/testData.json';

test.describe('Sauce Demo - Capstone Automation Suite', () => {

  // Scenario 1: Login, Add 1 product, and Logout
  test('Scenario 1: User can Login, Add product to cart and Logout', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);
    await inventoryPage.verifyOnInventoryPage();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.verifyBackpackButtonText('Remove');
    await inventoryPage.verifyCartCount('1');

    await inventoryPage.openMenu();
    await inventoryPage.clickLogout();
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
  });

  // Scenario 2: Login, Add to cart, Complete Checkout, and Logout
  test('Scenario 2: User can Add product, proceed to checkout and Logout', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.verifyBackpackButtonText('Remove');
    await inventoryPage.verifyCartCount('1');
    await inventoryPage.clickCartIcon();

    await cartPage.clickCheckout();
    await checkoutPage.verifyStepOneURL();
    await checkoutPage.fillInformation(
      testData.checkoutUser.firstName,
      testData.checkoutUser.lastName,
      testData.checkoutUser.postalCode
    );
    await checkoutPage.clickContinue();

    await checkoutPage.verifyStepTwoURL();
    await checkoutPage.clickFinish();
    await checkoutPage.verifyOrderSuccess();

    await inventoryPage.openMenu();
    await inventoryPage.clickLogout();
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
  });

  // Scenario 3: Sort Price (low to high), Add item, Checkout, and Logout
  test('Scenario 3: Sort by Price low to high, Add product, Checkout and Logout', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    await inventoryPage.selectSortOption('lohi');
    await inventoryPage.verifyPriceOrderAscending();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.clickCartIcon();

    await cartPage.clickCheckout();
    await checkoutPage.verifyStepOneURL();
    await checkoutPage.fillInformation(
      testData.checkoutUser.firstName,
      testData.checkoutUser.lastName,
      testData.checkoutUser.postalCode
    );
    await checkoutPage.clickContinue();

    await checkoutPage.verifyStepTwoURL();
    await checkoutPage.clickFinish();
    await checkoutPage.verifyOrderSuccess();

    await inventoryPage.openMenu();
    await inventoryPage.clickLogout();
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
  });

  // Scenario 4: Add Multiple products to cart and Logout
  test('Scenario 4: Add Multiple products to cart and Logout', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    await inventoryPage.addMultipleProducts();
    await inventoryPage.verifyCartCount('3');

    await inventoryPage.openMenu();
    await inventoryPage.clickLogout();
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
  });

  // Scenario 5: Remove one item from cart page, checkout and Logout
  test('Scenario 5: Remove one item from cart, checkout and Logout', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    await inventoryPage.addMultipleProducts();
    await inventoryPage.clickCartIcon();

    await cartPage.verifyItemCount(3);
    await cartPage.removeBoltTShirt();
    await cartPage.verifyCartCount('2');

    await cartPage.clickCheckout();
    await checkoutPage.verifyStepOneURL();
    await checkoutPage.fillInformation(
      testData.checkoutUser.firstName,
      testData.checkoutUser.lastName,
      testData.checkoutUser.postalCode
    );
    await checkoutPage.clickContinue();

    await checkoutPage.verifyStepTwoURL();
    await checkoutPage.clickFinish();
    await checkoutPage.verifyOrderSuccess();

    await inventoryPage.openMenu();
    await inventoryPage.clickLogout();
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
  });

  // Scenario 6: Verify Social Links in Footer open in new tab
  test('Scenario 6: Open Facebook and LinkedIn social links in new tabs', async ({ loginPage, context, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    // Facebook
    const [fbPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a[href*="facebook.com"]').click(),
    ]);
    await fbPage.waitForLoadState();
    expect(fbPage.url()).toContain('facebook.com/saucelabs');
    await fbPage.close();

    // LinkedIn
    const [linkedInPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('a[href*="linkedin.com"]').click(),
    ]);
    await linkedInPage.waitForLoadState();
    expect(linkedInPage.url()).toContain('linkedin.com');
    await linkedInPage.close();
  });

  // Scenario 7: Reset App State synchronization
  test('Scenario 7: Reset App State clears cart badge', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    await inventoryPage.addMultipleProducts();
    await inventoryPage.verifyCartCount('3');

    await inventoryPage.openMenu();
    await inventoryPage.resetAppState();
    await inventoryPage.closeMenu();

    await inventoryPage.verifyCartBadgeNotVisible();
  });

  // Scenario 8: Cart button sync between detail page and main list
  test('Scenario 8: Detail page Remove button synchronizes cart count', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.navigate('/');
    await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.verifyBackpackButtonText('Remove');

    await inventoryPage.openBackpackDetail();
    const removeButton = page.locator('#remove');
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await inventoryPage.verifyCartBadgeNotVisible();
  });

  // Scenario 9: Unauthorized direct access to /inventory.html is blocked
  test('Scenario 9: Unauthorized direct access to inventory redirects to login with error', async ({ loginPage, page }) => {
    await page.goto(`${ENV.BASE_URL}/inventory.html`);
    await expect(page).toHaveURL(/saucedemo.com\/?$/);
    await loginPage.verifyErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });

});