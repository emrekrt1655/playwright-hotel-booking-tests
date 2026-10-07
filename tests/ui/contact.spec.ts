import { test, expect } from '@playwright/test';
import { ContactForm } from '../../pages/ContactForm';
import { validContactData, invalidContactData } from '../../test-data/contact';

test.describe('Contact Form Validation', () => {
  let contactForm: ContactForm;

  test.beforeEach(async ({ page }) => {
    contactForm = new ContactForm(page);
    await page.goto('/');
  });

  test('should submit contact form successfully with valid details', async () => {
    const dynamicName = `${validContactData.name}_${Date.now()}`;
    
    await contactForm.fillForm({
      ...validContactData,
      name: dynamicName,
    });
    await contactForm.submit();

    await expect(contactForm.successHeader).toContainText('Thanks for getting in touch');
  });

  test('should display validation error when submitting an empty form', async () => {
    await contactForm.submit();
    
    await expect(contactForm.alertDanger).toBeVisible();
  });

  test('should display validation error for invalid email format', async () => {
    await contactForm.fillForm({
      ...validContactData,
      email: invalidContactData.invalidEmail,
    });
    await contactForm.submit();

    await expect(contactForm.alertDanger).toBeVisible();
  });
});