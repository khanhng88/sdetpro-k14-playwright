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
  // await page.waitForTimeout(3 * 1000);

  await computerFlow.agreeTOSAndCheckOut();
  await computerFlow.inputBillingAddress();
  await computerFlow.inputShippingAddress();
  await computerFlow.selectShippingMethod();

  //debug
  // await page.waitForTimeout(3 * 1000);


  
})