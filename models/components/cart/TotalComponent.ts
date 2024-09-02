import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector(".cart-footer .totals")
export default class TotalComponent {

    protected component: Locator;
    private priceTableRowSel = 'table tr';
    private priceTypeSel = '.cart-total-left span';
    private priceValueSel = '.cart-total-right .product-price';
    private termOfServiceChecckBoxSel = '#termsofservice';
    private checkOutBtnSel = '#checkout';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async priceCategories(): Promise<any>{
        let priceCategories = {};
        const priceTableRowElements = await this.component.locator(this.priceTableRowSel).all();
        for (const tableRow of priceTableRowElements) {
            const priceTypeText = await tableRow.locator(this.priceTypeSel).textContent();
            const priceValueText = await tableRow.locator(this.priceValueSel).textContent();

            priceCategories[priceTypeText] = Number(priceValueText);
        
        }
        return priceCategories;
    }

    public async acceptTOS(): Promise<void> {
        await this.component.locator(this.termOfServiceChecckBoxSel).click();
    }

    public async clickOnCheckOutBtn(): Promise<void> {
        await this.component.locator(this.checkOutBtnSel).click();
    }
}