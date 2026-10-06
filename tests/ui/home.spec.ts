import {test, expect} from '@playwright/test';
import {HomePage} from '../../pages/HomePage';

test.describe('Home Page Smoke Tests', () => {
    test('should load the home page correctly and display key components', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.goto();

        await expect(page).not.toHaveTitle('');
        await expect(homePage.hotelHeader).toBeVisible();
        await expect(homePage.roomCards.first()).toBeVisible();
        await expect(homePage.bookingButton.first()).toBeVisible();

    })
})