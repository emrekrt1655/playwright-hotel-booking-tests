import { Page, Locator } from "@playwright/test";

export interface ContactFormData {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  description?: string;
}

export class ContactForm {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;
  readonly successHeader: Locator;
  readonly alertDanger: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByTestId("ContactName");
    this.emailInput = page.getByTestId("ContactEmail");
    this.phoneInput = page.getByTestId("ContactPhone");
    this.subjectInput = page.getByTestId("ContactSubject");
    this.descriptionInput = page.getByTestId("ContactDescription");

    this.submitButton = page.getByRole("button", { name: "Submit" });

    this.successHeader = page.getByRole("heading", {
      name: /thanks for getting in touch/i,
    });
    this.alertDanger = page.locator(".alert-danger");
  }

  async fillForm(data: ContactFormData) {
    if (data.name !== undefined) {
      await this.nameInput.waitFor({ state: "visible" });
      await this.nameInput.fill(data.name);
    }
    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
    }
    if (data.phone !== undefined) {
      await this.phoneInput.fill(data.phone);
    }
    if (data.subject !== undefined) {
      await this.subjectInput.fill(data.subject);
    }
    if (data.description !== undefined) {
      await this.descriptionInput.fill(data.description);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}
