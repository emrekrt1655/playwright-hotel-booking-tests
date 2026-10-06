import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly hotelHeader: Locator;
  readonly roomCards: Locator;
  readonly bookingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hotelHeader = page.getByRole("heading", { level: 1 });
    this.roomCards = page.getByRole("listitem");
    this.bookingButton = page
      .getByRole("button", { name: /book/i })
      .or(page.getByRole("link", { name: /book/i }));
  }

  async goto() {
    await this.page.goto("/");
  }
}
