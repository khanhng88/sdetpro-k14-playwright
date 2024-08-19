import test, {} from '@playwright/test';
import ComputerDetailsPage from '../../models/pages/ComputerDetailsPage';
import ComputerCheapComponent from '../../models/components/computer/ComputerCheapComponent';
import ComputerStandardComponent from '../../models/components/computer/ComputerStandardComponent';
import OrderComputerFlow from './OrderComputerFlow.spec';
import testData from '../../test-data/computer/CheapComputerData.json'
import ShoppingCartPage from '../../models/pages/ShoppingCartPage';


test('Test Cheap computer component', async ({page}) =>{
  await page.goto("https://demowebshop.tricentis.com/build-your-cheap-own-computer");
  const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, ComputerCheapComponent, testData);
  computerFlow.buildCompSpecAndAddToCart();
  await computerFlow.verifyShoppingCart();

  //debug
  await page.waitForTimeout(3 * 1000);

  //test shopping cart page
  const shoppingCartPage: ShoppingCartPage =  new ShoppingCartPage(page);
  const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
  const totalComponent = shoppingCartPage.totalComponent();

  for (let cartItemRowComponent of cartItemRowComponentList) {
    const unitPrice = await cartItemRowComponent.unitPrice();
    const quantity = await cartItemRowComponent.quantity();
    const subTotal = await cartItemRowComponent.subTotal();
    console.log(`unit price ${unitPrice} quantity ${quantity} subtotal ${subTotal}`);
    
  }

  const priceCategories =await totalComponent.priceCategories();
  console.log(`price categories ${JSON.stringify(priceCategories)}`);
  
})