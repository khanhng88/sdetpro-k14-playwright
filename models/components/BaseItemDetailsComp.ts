import { Locator } from "@playwright/test";
import { selector } from "../components/SelectorDecorator";
@selector(".product-essential")
export default class BaseItemDetailsComp {

    protected component: Locator;
    private priceSel = '.product-price';
    private producQuantitySel = 'input[class = "qty-input"]';
    private allOptionSel = '.option-list input';
    private addToCartBtnSel = 'input[id^="add-to-cart-button"]';
    protected constructor(component: Locator) {
        this.component = component;
    }

    public async getProductPrice(): Promise<number>{
        const productPrice =  await this.component.locator(this.priceSel);
        return Number(await productPrice.textContent());
    }

    public async getProductQuantity(): Promise<number>{
        const productPrice =  await this.component.locator(this.producQuantitySel);
        return Number(await productPrice.getAttribute('value'));
    }

    public async unselectDefaultOptions(): Promise<void> {
        const allOptions = await this.component.locator(this.allOptionSel).all();
        for (let option of allOptions) {
            const isSelected = await option.getAttribute('checked');
            if(isSelected) {
                await option.click();
            }
        } 
    }

    public async clickAddToCartBtn(): Promise<void>{
        await this.component.locator(this.addToCartBtnSel).click();
    
    }


}