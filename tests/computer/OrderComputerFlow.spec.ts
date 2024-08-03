import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponents from "../../models/components/computer/ComputerEssentialsComponents";

export default class OrderComputerFlow {
    constructor(private page:Page, private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponents>){
        this.page = page;
        this.computerComponentClass = computerComponentClass;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.selectProcessorType("2.2 GHz");
        await computerComp.selectRamType("4GB");
        await computerComp.selectHDDType("400 GB");
        // await computerComp.selectOSType("Windows 10");
        // await computerComp.selectSoftwareType("Office Suite");
    }
}