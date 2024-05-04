import test, {} from '@playwright/test';
import LoginPageMethod2 from '../models/pages/LoginPageMethod2';

test('Test POM method 1 - introduce main interactions', async ({page}) =>{
    const loginPage: LoginPageMethod2 = new LoginPageMethod2(page);
    await page.goto('https://the-internet.herokuapp.com/login');
    await loginPage.username().fill("tomsmith");
    await loginPage.password().fill("SuperSecretPassword!");
    await loginPage.loginBtn().click();

    await page.waitForURL('**/secure');
})

