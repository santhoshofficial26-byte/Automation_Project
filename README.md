# 🧪 Sauce Demo End-to-End Automation Framework

Welcome to my first **Playwright Test Automation Capstone Project**! 🎯

This repository contains an end-to-end (E2E) automated testing suite built for the [SauceDemo E-Commerce Website](https://www.saucedemo.com/) using **Playwright**, **TypeScript**, the **Page Object Model (POM)** pattern, **Allure Reporting**, and a **Jenkins CI/CD Pipeline**.

---

## 📌 Project Overview

This project demonstrates foundational and industry-standard testing concepts:

- **Modular Architecture:** Clean separation of Locators, Pages, Fixtures, and Test Data.
- **Page Object Model (POM):** Reusable page methods to keep test cases clean, readable, and easy to maintain.
- **Custom Fixtures:** Automatic dependency injection so you don't have to manually instantiate page objects.
- **Robust Assertions:** Leveraging Playwright's auto-waiting mechanism to avoid flaky tests.
- **Rich Reporting:** Detailed execution analytics with Allure Reports and Playwright HTML reports.
- **CI/CD Integration:** Automated headless execution via Jenkins.

---

## 🛠️ Tech Stack & Tools

| Tool / Library                    | Purpose                                                       |
| :-------------------------------- | :------------------------------------------------------------ |
| **Playwright**              | Next-generation web test automation runner                    |
| **TypeScript**              | Strongly-typed JavaScript for error reduction and code safety |
| **Node.js**                 | JavaScript runtime environment                                |
| **Page Object Model (POM)** | Design pattern for test maintainability and code reuse        |
| **Allure Report**           | Interactive, visual test execution dashboard                  |
| **Jenkins**                 | Continuous Integration & Continuous Delivery (CI/CD) server   |
| **Git & GitHub**            | Distributed version control and source code hosting           |

---

## 📂 Project Directory Structure

```text
Automation_Project/
│
├── .env                        # Environment variables (Base URL, credentials)
├── .gitignore                  # Ignored files and folders (node_modules, reports)
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration settings
├── playwright.config.ts        # Playwright global configuration
├── Jenkinsfile                 # Jenkins CI/CD automation pipeline script
├── README.md                   # Project documentation and setup guide
│
├── config/
│   └── environment.ts          # Centralized configuration helper reading from .env
│
├── locators/                   # CSS and XPath selectors categorized per page
│   ├── loginLocators.ts
│   ├── inventoryLocators.ts
│   ├── cartLocators.ts
│   └── checkoutLocators.ts
│
├── pages/                      # Page Object classes with user actions
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── fixtures/
│   └── customFixture.ts        # Custom Playwright test fixture injecting page objects
│
├── test-data/
│   └── testData.json           # External JSON data (checkout info, product names)
│
├── utils/
│   └── helper.ts               # Reusable utility functions (e.g., price parser)
│
└── tests/
    └── Capstone_Project.spec.ts # All 9 automated test scenarios in a single file
```

---

## 📋 Test Scenarios Covered

All 9 test cases are implemented inside `tests/Capstone_Project.spec.ts`:

1. **Scenario 1:** Login with standard credentials, add 1 item to the cart, verify cart badge, and logout.
2. **Scenario 2:** Login, add item, proceed to checkout, enter user details, finish order, and verify success message.
3. **Scenario 3:** Sort products by price (low-to-high), verify price ordering, add product, complete checkout, and logout.
4. **Scenario 4:** Add multiple products to the cart simultaneously and verify the cart badge count reflects 3 items.
5. **Scenario 5:** Add multiple items, open cart page, remove one item, verify badge updates to 2, and checkout.
6. **Scenario 6:** Verify footer social media links (Facebook & LinkedIn) open in new tabs with the correct URLs.
7. **Scenario 7:** Verify the "Reset App State" menu feature clears all added cart items.
8. **Scenario 8:** Open product details view, remove product, and ensure cart button state synchronizes.
9. **Scenario 9:** Negative test: Verify unauthorized direct URL navigation to `/inventory.html` redirects back to login with an error message.

---

## 🚀 Getting Started (Step-by-Step)

### 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18 or higher): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Java JDK 17+** (Required only for Allure and Jenkins): [Download Java](https://adoptium.net/)

---

### 2. Clone the Repository

```bash
git clone https://github.com/santhoshofficial26-byte/Automation_Project.git
cd Automation_Project
```

---

### 3. Install Dependencies & Browsers

Install all required Node.js packages and browser binaries:

```bash
npm install
npx playwright install
```

---

### 4. Setup Environment Variables

Create a file named `.env` in the root folder and add:

```env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
```

---

## 🏃 Running Tests

| Command                          | Description                                       |
| :------------------------------- | :------------------------------------------------ |
| `npx playwright test`          | Runs all 9 tests in headless mode (background)    |
| `npx playwright test --headed` | Runs tests with a visible browser window          |
| `npx playwright test --ui`     | Opens Playwright's interactive visual UI runner   |
| `npx playwright show-report`   | Opens the default built-in Playwright HTML report |

---

## 📊 Allure Test Reports

To generate and open the interactive Allure Dashboard:

```bash
# Option 1: Fast preview (generates and opens in one step)
npx allure serve allure-results

# Option 2: Build static report and launch
npm run allure:generate
npm run allure:open
```

> **Tip:** Do not double-click `allure-report/index.html` directly from your file manager because browser security restricts local file access (`file://`). Always view it via `allure serve` or `allure open`.

---

## 🔄 Jenkins CI/CD Setup

This repository includes a pre-configured `Jenkinsfile` for continuous integration.

1. Start Jenkins locally:
   ```bash
   java -jar "F:\Jenkins\Jenkins.war" --httpPort=9090
   ```
2. Open `http://localhost:9090` in your browser.
3. Install the **NodeJS Plugin** and **Allure Jenkins Plugin** via **Manage Jenkins > Plugins**.
4. Configure Tools under **Manage Jenkins > Tools**:
   - **NodeJS**: Name it `NodeJS` (must match `Jenkinsfile`).
   - **Allure Commandline**: Name it `allure`.
5. Create a new **Pipeline** item:
   - Choose **Pipeline script from SCM**.
   - Select **Git** and supply your repository URL: `https://github.com/santhoshofficial26-byte/Automation_Project.git`.
   - Branch: `*/main`.
   - Script Path: `Jenkinsfile`.
6. Click **Build Now** to trigger the automated test pipeline and view Allure results on completion.

---

## 👤 Author

- **QA Engineer:** Santhosh B
- **Project:** Sauce Demo Playwright Automation Capstone Project
- **GitHub Profile:** [@santhoshofficial26-byte](https://github.com/santhoshofficial26-byte)

---

												**Thank You !**
