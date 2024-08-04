import { Locator, Page } from "@playwright/test";
import ComputerEssentialComponents from "../components/computer/ComputerEssentialsComponents";
import HeaderComponent from "../components/global/header/HeaderComponent";

export type ComputerComponentConstructor<T extends ComputerEssentialComponents> = new (component: Locator) => T;
export default class ComputerDetailsPage {
    private barNotificationSel = '#bar-notification p';
    constructor(private page: Page) {
        this.page = page;
    }

    public async getBarNotificationText(): Promise<string|null> {
        return await this.page.locator(this.barNotificationSel).textContent();
    }

    public headerComp(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.selector))
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