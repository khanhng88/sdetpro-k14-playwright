import { Locator } from "@playwright/test";
import ComputerEssentialComponents from "./ComputerEssentialsComponents";
import { selector } from "../SelectorDecorator";

@selector(".ComputerStandardComponent.selector")
export default class ComputerStandardComponent extends ComputerEssentialComponents{
    
    constructor(component: Locator) {
        super(component);
    }
    
    public selectProcessorType(type: string): Promise<void> {
        console.log("selectProcessorType | ComputerStandardComponent");
        return Promise.resolve(undefined);
    }
    public selectRamType(type: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}