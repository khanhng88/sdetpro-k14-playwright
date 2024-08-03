import { Locator, Page } from "@playwright/test";
import ComputerEssentialComponents from "../components/computer/ComputerEssentialsComponents";

export type ComputerComponentConstructor<T extends ComputerEssentialComponents> = new (component: Locator) => T;
export default class ComputerDetailsPage {

    constructor(private page: Page) {
        this.page = page;
    }
    
    //boundary generic type
    computerComp<T extends ComputerEssentialComponents>(computerComponentClass: ComputerComponentConstructor<T>)
    :T
    {
        console.log(computerComponentClass.selectorValue);
        // computerComponentClass.selectorValue;
        return new computerComponentClass(this.page.locator(computerComponentClass.selectorValue));
    }
}