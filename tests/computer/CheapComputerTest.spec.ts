import test, {} from '@playwright/test';
import ComputerDetailsPage from '../../models/pages/ComputerDetailsPage';
import ComputerCheapComponent from '../../models/components/computer/ComputerCheapComponent';
import ComputerStandardComponent from '../../models/components/computer/ComputerStandardComponent';
import OrderComputerFlow from './OrderComputerFlow.spec';


test('Test Cheap computer component', async ({page}) =>{
  await page.goto("https://demowebshop.tricentis.com/build-your-cheap-own-computer");
  const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, ComputerCheapComponent);
  computerFlow.buildCompSpecAndAddToCart();

  //debug
  await page.waitForTimeout(3 * 1000);
})