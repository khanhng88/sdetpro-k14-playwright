import test, {} from '@playwright/test';
import ComputerStandardComponent from '../../models/components/computer/ComputerStandardComponent';
import OrderComputerFlow from './OrderComputerFlow.spec';
import testData from '../../test-data/computer/StandardComputerData.json'

test('Test Standard computer component', async ({page}) =>{
  await page.goto("https://demowebshop.tricentis.com/build-your-own-computer");
  console.log(testData.processorType);
  
  const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, ComputerStandardComponent, testData);
  computerFlow.buildCompSpecAndAddToCart();


  // debug
  await page.waitForTimeout(5 * 1000);
})