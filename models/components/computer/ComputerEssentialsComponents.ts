import { Locator } from "@playwright/test";

export default abstract class ComputerEssentialComponents {

    protected component: Locator;
    protected constructor(component: Locator) {
        this.component = component;
    }

    public abstract selectProcessorType(type: string): Promise<void>;
    public abstract selectRamType(type: string): Promise<void>;

    public async selectHDDType(type: string): Promise<void> {
        this.selectCompOptions(type);
    }

    public async selectOSType(type: string): Promise<void> {
        this.selectCompOptions(type);
    }

    public async selectSoftwareType(type: string): Promise<void> {
        this.selectCompOptions(type);
    }

    protected async  selectCompOptions(type: string): Promise<void> {

        const selectorValue = `//label[contains(text(),"${type}")]`;
        const optionElements: Locator[] = await this.component.locator(selectorValue).all();
        await optionElements[0].scrollIntoViewIfNeeded();
        await optionElements[0].click();
    }
}