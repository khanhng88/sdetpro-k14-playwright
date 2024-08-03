import { Locator } from "@playwright/test";
import ComputerEssentialComponents from "./ComputerEssentialsComponents";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class ComputerCheapComponent extends ComputerEssentialComponents{
    
    constructor(component: Locator) {
        super(component);
    }
    
    async selectProcessorType(type: string): Promise<void> {
        await this.selectCompOptions(type);
    }
    async selectRamType(type: string): Promise<void> {
        await this.selectCompOptions(type);
    }

}