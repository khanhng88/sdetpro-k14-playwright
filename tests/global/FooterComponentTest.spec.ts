import test, { Locator, Page } from "@playwright/test";
import FooterColumnComponent from "../../models/components/global/footer/FooterColumnComponent";
import {deepStrictEqual} from 'assert';
import FooterComponent from "../../models/components/global/footer/FooterComponent";
import FooterTestFlow from "../../test-flows/global/FooterTestFlows";

test ('Test footer component Homepage', async({page})=> {
    await page.goto('https://demowebshop.tricentis.com/');
    const footerTestFlow: FooterTestFlow = new FooterTestFlow(page);
    await footerTestFlow.verifyFooterComponent();


    await page.waitForTimeout(1000);
})