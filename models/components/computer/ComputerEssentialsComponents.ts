import { Locator } from "@playwright/test";
import BaseItemDetailsComp from "../BaseItemDetailsComp";

export default abstract class ComputerEssentialComponents extends BaseItemDetailsComp {

    protected component: Locator;
    protected constructor(component: Locator) {
        super(component)
        this.component = component;
    }

    public abstract selectProcessorType(type: string): Promise<string|null>;
    public abstract selectRamType(type: string): Promise<string|null>;

    public async selectHDDType(type: string): Promise<string|null> {
        return this.selectCompOptions(type);
    }

    public async selectOSType(type: string): Promise<string|null> {
        return this.selectCompOptions(type);
    }

    public async selectSoftwareType(type: string): Promise<string|null> {
        return this.selectCompOptions(type);
    }

    protected async  selectCompOptions(type: string): Promise<string | null> {

        const selectorValue = `//label[contains(text(),"${type}")]`;
        const optionElements: Locator[] = await this.component.locator(selectorValue).all();
    
        const optionElement = optionElements[0];
        
        await optionElement.scrollIntoViewIfNeeded();
        
        const optionText = optionElement.textContent();
        await optionElement.click();
        return optionText;
    }
}