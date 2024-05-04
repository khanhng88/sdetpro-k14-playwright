import test, {} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import SearchComponent from '../models/components/SearchComponent';
import ProductItemComponent from '../models/components/ProductItemComponent';


test('Test Component in page', async ({page}) =>{
    await page.goto('https://demowebshop.tricentis.com/');

    const homepage: HomePage = new HomePage(page);
    const productItemComponentList: ProductItemComponent[]= await homepage.productItemComponentList();


    for (let productItemComponent of productItemComponentList) {
        let productTitle = await productItemComponent.productTitle().textContent();
        let productPrice = await productItemComponent.productPrice().textContent();
        console.log(`${productTitle.trim()}: ${productPrice?.trim()}`);

        
    }

    await page.waitForTimeout(1000);
})