import { Locator } from "@playwright/test";
import ComputerEssentialComponents from "./ComputerEssentialsComponents";
import { selector } from "../SelectorDecorator";

@selector(".ComputerCheapComponent.selector")
export default class ComputerCheapComponent extends ComputerEssentialComponents{
    
    constructor(component: Locator) {
        super(component);
    }
    
    public selectProcessorType(type: string): Promise<void> {
        console.log("selectProcessorType | ComputerCheapComponent");
        
        return Promise.resolve(undefined);
    }
    public selectRamType(type: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}