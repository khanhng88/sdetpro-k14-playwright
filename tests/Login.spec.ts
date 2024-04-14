// import {chromium, Browser, Page, BrowserContext} from 'playwright';
import {test} from '@playwright/test';

test('Login test', async ({page, browser}) => {
// const browser: Browser = await  chromium.launch();
// const context: BrowserContext = await browser.newContext()
// const page: Page = await browser.newPage();
await page.goto('https://playwright.dev/');
await page.locator('teooi').click();

await page.close();
})