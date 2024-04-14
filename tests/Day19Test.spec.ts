import {test} from '@playwright/test';

test('Link test xpath', async ({page}) => {
await page.goto('https://the-internet.herokuapp.com/');
await page.waitForSelector('//a[contains(text(),"A/B Testing")]', {timeout: 10000}).click();

await page.waitForTimeout(3000);
})

test('Link test -css', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.locator('a:has-text("A/B Testing")').click();
    
    await page.waitForTimeout(3000);
})

test('Link test -Filtering', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/');
        await page.locator('a').filter({hasText:"A/B Testing"}).click();
        
        await page.waitForTimeout(3000);
 })

 test('Link test -Filtering with scroll, matching multiple', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
   const footerLinks = await page.locator('a').elementHandles();
    
    await page.waitForTimeout(5000);
    await footerLinks[10].click();
})

test.only('Fill form', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.locator('a').filter({hasText: "Form Authentication"}).click();
    await page.waitForLoadState('domcontentloaded');
  

    await page.locator("#username").fill("teo@sth.com");
    await page.locator("#password").fill("0987654321");
    await page.waitForTimeout(3000);
    await page.locator("button[type='submit']").click();
    await page.waitForLoadState('domcontentloaded');

    //getText
   const textContent = await page.locator('h4').textContent();
   const innerText = await page.locator('h4').innerText();

   console.log(textContent);
   console.log(innerText);
   
    
    await page.waitForTimeout(3000);
})