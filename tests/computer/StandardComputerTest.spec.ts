import test, {} from '@playwright/test';
import ComputerStandardComponent from '../../models/components/computer/ComputerStandardComponent';
import OrderComputerFlow from './OrderComputerFlow.spec';


test('Test Standard computer component', async ({page}) =>{
  await page.goto("https://demowebshop.tricentis.com/build-your-own-computer");
  const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, ComputerStandardComponent);
  computerFlow.buildCompSpecAndAddToCart();

  //debug
  await page.waitForTimeout(5 * 1000);
})