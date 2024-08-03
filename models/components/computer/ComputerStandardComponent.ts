import { Locator } from "@playwright/test";
import ComputerEssentialComponents from "./ComputerEssentialsComponents";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class ComputerStandardComponent extends ComputerEssentialComponents{
    
    private producAttrSel = "select[id^='product_attribute']";
    constructor(component: Locator) {
        super(component);
    }
    
    async selectProcessorType(type: string): Promise<void> {
        const PROCESSOR_INDEX = 0
        const allDropdown: Locator[] = await this.component.locator(this.producAttrSel).all();
        await this.selectOption(allDropdown[PROCESSOR_INDEX], type)
    }
    async selectRamType(type: string): Promise<void> {
        const RAM_INDEX = 1
        const allDropdown: Locator[] = await this.component.locator(this.producAttrSel).all();
        await this.selectOption(allDropdown[RAM_INDEX], type)
    }

    private async selectOption(dropdown: Locator, type: string): Promise<void> {
        //loop all options and search for target option 
        const allOptions = await dropdown.locator('option').all();
        let optionIndex = 0;
        for (let option of allOptions) {
            const optionText = await option.textContent();
            if(optionText?.startsWith(type)){
                optionIndex = allOptions.indexOf(option);
                break;
            }
            
        }
        await dropdown.selectOption({index: optionIndex});
    }

}