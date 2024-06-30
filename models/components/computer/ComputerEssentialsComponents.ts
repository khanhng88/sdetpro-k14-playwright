import { Locator } from "@playwright/test";

export default abstract class ComputerEssentialComponents {

    protected constructor(private component: Locator) {
        this.component = component;
    }

    public abstract selectProcessorType(type: string): Promise<void>;
    public abstract selectRamType(type: string): Promise<void>;

}