import { Locator } from "@playwright/test";

//Base component
export default class FooterColumnComponent {

    private titleSel:string ="h3";
    private linkSel:string = "li a";

    //to force concreate class component constructor
    constructor(private component: Locator) {
        this.component = component;
    }

    title(): Locator {
        return this.component.locator(this.titleSel);
    
    }

    links():Promise< Array<Locator>> {
        return this.component.locator(this.linkSel).all();
    
    }

}