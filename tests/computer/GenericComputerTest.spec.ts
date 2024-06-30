import test, {} from '@playwright/test';
import ComputerDetailsPage from '../../models/pages/ComputerDetailsPage';
import ComputerCheapComponent from '../../models/components/computer/ComputerCheapComponent';
import ComputerStandardComponent from '../../models/components/computer/ComputerStandardComponent';


test('Test Generic Component in page', async ({page}) =>{
  const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(page);
  const cheapComputerComp = computerDetailsPage.computerComp(ComputerCheapComponent);
  const standardComputerComp = computerDetailsPage.computerComp(ComputerStandardComponent);
  await cheapComputerComp.selectProcessorType("cheap");
  await standardComputerComp.selectProcessorType("standard");
  
})