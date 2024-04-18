import {expect, test} from '@playwright/test';

test('Handle dropdown', async ({page}) => {
await page.goto('https://the-internet.herokuapp.com/dropdown');


//target dropdown
const dropdownElement = await page.locator("#dropdown");

//select option 1
dropdownElement.selectOption({index: 1})
await page.waitForTimeout(1500);

//select option 2
dropdownElement.selectOption({value: '2'})
await page.waitForTimeout(1500);
})

test('Handle iframe', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    
    
    //target iframe
    const iframeElement =  await page.frameLocator("iframe[id^='mce']");
    
    //find edit textarea in iframe
    const editTextArea = await iframeElement.locator('body p');

    //clear then input new content
    await editTextArea.click();
    await editTextArea.clear();
    await editTextArea.fill('New content');
    await page.waitForTimeout(2000);

    //interact with main frame
    const footerPowerByLinkElement = await page.locator('//a[contains(text(),"Elemental Selenium")]');
    await footerPowerByLinkElement.click();
    await page.waitForTimeout(2000);

   
    })

test.only('mouse hover and narrow down searching scope', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    
    
    //find all figures
    const allFigures = await page.locator('.figure').all();
    

    for(const figureEle of allFigures) {
        const imgEle = await figureEle.locator('img')
        let userCaption = await figureEle.locator('h5');
        console.log(`Before hovering, is user caption visible? ${await userCaption.isVisible()}`);

        //mouse hover
        await imgEle.hover();
        // userCaption = await figureEle.locator('h5');
        console.log(`After hovering, is user caption visible? ${await userCaption.isVisible()} =>  ${await userCaption.textContent()}`);
        console.log('\n');
        
        
        await page.waitForTimeout(1000);
    }
    
    })

test('checking element status and handle dynamic states', async ({page}) => {
await page.goto('https://the-internet.herokuapp.com/dynamic_controls');


//locate 2 parent components
const checkboxComp = await page.locator('#checkbox-example');
const inputComp = await page.locator('#input-example');

//interact with checkbox
const checkboxEle = await checkboxComp.locator('#checkbox input');
const isEnabled = await checkboxEle.isEnabled();
let isSelected = await checkboxEle.isChecked();

console.log(`is checkbox enabled? ${isEnabled}`);
console.log(`is checkbox selected? ${isSelected}`);

if(!isSelected) {
    await checkboxEle.click();
}

let isSelectedAfter = await checkboxEle.isChecked();
console.log(`after selecting, is checkbox selected? ${isSelectedAfter}`);

if(!isSelectedAfter) {
    await checkboxEle.click();
}
await page.waitForTimeout(1500);


const removeBtn = await checkboxComp.locator('button');
await removeBtn.click();
await page.waitForSelector('#checkbox-example #checkbox input', {state: 'hidden', timeout: 5000})
// await page.waitForSelector('#checkbox-example #checkbox input', {state: 'hidden', timeout: 2000})

const inputElem = await inputComp.locator('input');
const enableBtn = await inputComp.locator('button');
let isInputElemEnabled = await inputElem.isEnabled();
if(!isInputElemEnabled) {
    await enableBtn.click();
}


await expect(inputElem).toBeEnabled({timeout: 6000})
console.log(`Is input element enabled? ${await inputElem.isEnabled()}`);
await inputElem.fill("Hello");
await page.waitForTimeout(1500);

})