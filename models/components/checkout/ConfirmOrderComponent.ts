import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-confirm_order")
export default class ConfirmOrderComponent {

    protected component: Locator;
    private unitPriceSel = '.product-unit-price';
    private quantityInputSel = 'input[class*="qty-input"]';
    private subTotalSel = '.product-subtotal';

    protected constructor(component: Locator) {
        this.component = component;
    }

    public async unitPrice(): Promise<number> {
        const unitPriceNum = await this.component.locator(this.unitPriceSel).textContent();
        return Number(unitPriceNum);
    }

    public async quantity(): Promise<number> {
        const quantityNum = await this.component.locator(this.quantityInputSel).getAttribute("value");
        return Number(quantityNum);
    }

    
    public async subTotal(): Promise<number> {
        const subTotalNum = await this.component.locator(this.subTotalSel).textContent();
        return Number(subTotalNum);
    }
}