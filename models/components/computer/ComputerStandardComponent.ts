import { Locator } from "@playwright/test";
import ComputerEssentialComponents from "./ComputerEssentialsComponents";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class ComputerStandardComponent extends ComputerEssentialComponents{
    
    private producAttrSel = "select[id^='product_attribute']";
    constructor(component: Locator) {
        super(component);
    }
    
    async selectProcessorType(type: string): Promise<string|null> {
        const PROCESSOR_INDEX = 0
        const allDropdown: Locator[] = await this.component.locator(this.producAttrSel).all();
        return await this.selectOption(allDropdown[PROCESSOR_INDEX], type)
    }
    async selectRamType(type: string): Promise<string|null> {
        const RAM_INDEX = 1
        const allDropdown: Locator[] = await this.component.locator(this.producAttrSel).all();
        return await this.selectOption(allDropdown[RAM_INDEX], type)
    }

    private async selectOption(dropdown: Locator, type: string): Promise<string | null> {
        //loop all options and search for target option 
        const allOptions = await dropdown.locator('option').all();
        let optionIndex:number|undefined = undefined;
        let optionFullText:string|null = '';
        for (const option of allOptions) {
            optionFullText = await option.textContent();
            if(optionFullText?.startsWith(type)){
                optionIndex = allOptions.indexOf(option);
                break;
            }
            
        }
        if(optionIndex === undefined) {
            throw new Error(`There is no option for ${type}`);
            
        }
        await dropdown.selectOption({index: optionIndex});
        return optionFullText;
    }

}