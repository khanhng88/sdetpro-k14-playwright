import {Page, expect, test} from '@playwright/test';

const jsAlertURL = 'https://the-internet.herokuapp.com/javascript_alerts';
const floatingMenuURL = 'https://the-internet.herokuapp.com/floating_menu';

test('Handle jsAlert', async ({page}) => {
await page.goto(jsAlertURL);

const jsAlertBtn = await page.locator('[onclick="jsAlert()"]');

//must define event
page.on('dialog', async dialog => {
    await dialog.accept();
});

//trigger jsalert
jsAlertBtn.click();
await page.waitForTimeout(6000);
})

test('Handle jsConfirm', async ({page}) => {
    await page.goto(jsAlertURL);
    
    const jsConfirmBtn = await page.locator('[onclick="jsConfirm()"]');
    
    //must define event
    page.on('dialog', async dialog => {
        console.log(`alert content is ${dialog.message()}`);
        
        await dialog.dismiss();
    });
    
    //trigger jsalert
    jsConfirmBtn.click();
    await page.waitForTimeout(3000);
    })

test('Handle jsPrompt', async ({page}) => {
    await page.goto(jsAlertURL);

    const jsPromptBtn = await page.locator('[onclick="jsPrompt()"]');

    //must define event
    page.on('dialog', async dialog => {
    console.log(`alert content is ${dialog.message()}`);

    await dialog.accept('I am accepting the js prompt');
    });

    //trigger jsalert
    jsPromptBtn.click();
    await page.waitForTimeout(3000);
})

test('Handle jsAlert automatically', async ({page}) => {
    await page.goto(jsAlertURL);

    const jsAlertBtn = await page.locator('[onclick="jsAlert()"]');
    await page.waitForTimeout(1500);


    //trigger jsalert
    jsAlertBtn.click();
    await page.waitForTimeout(3000);
})

test('execute js without parameter', async ({page}) => {
    await page.goto(floatingMenuURL);

    await page.locator('h3').highlight();

    //scroll to bottom
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    })


    //wait 2sec
    await page.waitForTimeout(2000);

    // scroll to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    })


    //wait another 2sec
    await page.waitForTimeout(2000);
})

test('execute js with parameter', async ({page}) => {
    await page.goto(floatingMenuURL);

    await page.locator('h3').highlight();

    //scroll to bottom
    await scrollToBottom(page, 1)


    //wait another 2sec
    await page.waitForTimeout(2000);
})

test.only('execute js  and return value', async ({page}) => {
    await page.goto('https://www.foodandwine.com/');
    //wait another 2sec
    // await page.waitForTimeout(5000);
    await page.waitForSelector('div[id="leaderboard-flex-1"]',{timeout: 10000, state: 'visible'});
    await scrollToBottom(page, 1);
    await page.waitForTimeout(1000);

    const returnAdsvalue = await getAdsParams(page,'leaderboard-flex-1' )
    await page.waitForTimeout(2000);
    //scroll to bottom
    console.log(returnAdsvalue);
    


})

//params: page, scrollPercentage: number

async function scrollToBottom(page: Page, scrollPercentage: number) {
    await page.evaluate(scrollPercentage => {
        window.scrollTo(0, scrollPercentage * document.body.scrollHeight);
    }, scrollPercentage);
}

async function getAdsParams(page: Page, adlSlot: string) {
    return await page.evaluate(adlSlot=> {
        const slot = googletag.pubads().getSlots().find(({getSlotElementId}) => getSlotElementId() === adlSlot)
        return slot.getTargetingMap();
    }, adlSlot)
}

