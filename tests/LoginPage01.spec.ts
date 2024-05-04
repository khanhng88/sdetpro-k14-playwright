import test, {} from '@playwright/test';
import LoginPageMethod1 from '../models/pages/LoginPageMethod1';

test('Test POM method 1 - introduce main interactions', async ({page}) =>{
    const loginPage: LoginPageMethod1 = new LoginPageMethod1(page);
    await page.goto('https://the-internet.herokuapp.com/login');
    await loginPage.inputUsername("tomsmith");
    await loginPage.inputPassword("SuperSecretPassword!");
    await loginPage.clickLoginBtn();

    await page.waitForURL('**/secure');
})

