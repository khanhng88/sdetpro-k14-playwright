import test, {} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import SearchComponent from '../models/components/SearchComponent';


test('Test Component in page', async ({page}) =>{
    await page.goto('https://demowebshop.tricentis.com/');

    const homepage: HomePage = new HomePage(page);
    const searchComponent: SearchComponent = homepage.searchComponent();

    await searchComponent.searchBox().click();
    await searchComponent.searchBox().fill('laptop');
    await searchComponent.searchBtn().click();
  
})