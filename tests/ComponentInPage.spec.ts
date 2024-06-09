import test, {} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import HeaderComponent from '../models/components/global/header/HeaderComponent';
import SearchComponent from '../models/components/global/header/SearchComponent';


test('Test Component in page', async ({page}) =>{
    await page.goto('https://demowebshop.tricentis.com/');

    const homepage: HomePage = new HomePage(page);
    const headerComponent: HeaderComponent = homepage.headerComponent();
    const searchComponent: SearchComponent = headerComponent.searchComponent();

    await searchComponent.searchBox().click();
    await searchComponent.searchBox().fill('laptop');
    await searchComponent.searchBtn().click();

    await page.waitForTimeout(1000);
  
})