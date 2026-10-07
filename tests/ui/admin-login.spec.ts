import { test, expect } from "@playwright/test";
import { AdminLoginPage } from "../../pages/AdminLoginPage";

test.describe("Admin Login Tests", () => {
  let adminLoginPage: AdminLoginPage;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goto();
  });

  test("should login successfully with valid admin credentials", async () => {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD ;

    await adminLoginPage.login(username, password);

    await expect(adminLoginPage.logoutButton).toBeVisible();
  });

  test("should display error message with wrong password", async () => {
    const username = process.env.ADMIN_USERNAME ;

    await adminLoginPage.login(username, "wrongpassword123");

    await expect(adminLoginPage.errorMessage).toBeVisible();
  });

  test("should display error when logging in with empty credentials", async () => {
    await adminLoginPage.login("", "");

    await expect(adminLoginPage.errorMessage).toBeVisible();
  });
});
