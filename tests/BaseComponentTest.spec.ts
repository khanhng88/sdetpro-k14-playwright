import test, {} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import FooterComponent from '../models/components/global/footer/FooterComponent';
import InformationColumnComponent from '../models/components/global/footer/InformationColumnComponent';
import CustomerServiceColumnComponent from '../models/components/global/footer/CustomerServiceColumnComponent';


test('Test Base Component in page', async ({page}) =>{
    await page.goto('https://demowebshop.tricentis.com/');

    const homepage: HomePage = new HomePage(page);
    const footerComponent: FooterComponent = homepage.footerComponent();
    const informationColumnComponent: InformationColumnComponent = footerComponent.informationColumnComponent();
    const customerServiceColumnComponent: CustomerServiceColumnComponent = footerComponent.customerServiceColumnComponent();


    let informationColumnTitle = await informationColumnComponent.title().textContent();
    let customerServiceColumnTitle = await customerServiceColumnComponent.title().textContent();

    console.log(`informationColumnTitle: ${informationColumnTitle}`);
    console.log(`customerServiceColumnTitle: ${customerServiceColumnTitle}`);
    

    await page.waitForTimeout(1000);
})