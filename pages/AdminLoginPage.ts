import { Page, Locator } from "@playwright/test";

export class AdminLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.logoutButton = page.getByRole("button", { name: "Logout" });
    this.errorMessage = page
      .locator(".alert-danger")
      .or(page.locator(".alert"));
  }

  async goto() {
    await this.page.goto('/#/admin');
  }

  async login(username?: string, password?: string) {
    if (username !== undefined) {
      await this.usernameInput.fill(username);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }
}
