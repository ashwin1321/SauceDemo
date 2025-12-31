# SauceDemo UI Automation

## Project Overview

The project automates basic e-commerce flows on [SauceDemo](https://www.saucedemo.com/) such as logging in, sorting products, adding items to the cart, and verifying cart contents.

---

## Scope of Testing

The automated tests I implemented cover the following scenarios:

1. Logging in with a standard user account.
2. Sorting products by price from **high to low**.
3. Selecting the **top 2 priciest items** and adding them to the cart.
4. Verifying that the same **2 items are present in the cart**.

---

## Test Plan

**Test Objectives:**

- Verify that login works correctly.
- Ensure the sorting functionality behaves as expected.
- Confirm that the correct items are added to the cart.

**Test Environment:**

- Browser: Chrome (latest version)
- OS: MacOS

**Tools & Frameworks Used:**

- Node.js
- npm
- Cypress
- mochawesome for report generation

---

## How to Run

### 1. Clone the Repository

```bash
git clone git@github.com:ashwin1321/SauceDemo.git
cd SauceDemo
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Run tests

#### Headed Mode : (Opens Browser to run tests)

```bash
npm run headed
```

---

#### Headless Mode : (Runs tests in the background without opening a browser window)

```bash
npm run Headless
```

### 4. Test Report

- After execution, test reports are generated in the report folder.
- Open the HTML files in the folder to review the results.

### Note

- Make sure Node.js is pre-installed in your system
- Have a stable internet connection
