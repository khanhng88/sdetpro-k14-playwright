import test, {} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import ProductItemComponent from '../models/components/ProductItemComponent';
import PageBodyComponent from '../models/components/PageBodyComponent';


test('Test Component in page', async ({page}) =>{
    await page.goto('https://demowebshop.tricentis.com/');

    const homepage: HomePage = new HomePage(page);
    const pageBodyComponent: PageBodyComponent = homepage.pageBodyComponent();
    const productItemComponentList: ProductItemComponent[]= await pageBodyComponent.productItemComponentList();


    for (let productItemComponent of productItemComponentList) {
        let productTitle = await productItemComponent.productTitle().textContent();
        let productPrice = await productItemComponent.productPrice().textContent();
        console.log(`${productTitle.trim()}: ${productPrice?.trim()}`);
    }

    await page.waitForTimeout(1000);
})