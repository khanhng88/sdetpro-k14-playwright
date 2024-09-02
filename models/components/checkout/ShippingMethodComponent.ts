import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-shipping_method")
export default class ShippingMethodComponent {

    protected component: Locator;
    private continueBtnSel = 'input[value="Continue"]';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: 'hidden', timeout: 5 * 1000});
    }
}