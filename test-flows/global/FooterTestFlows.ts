import { Page } from "@playwright/test";
import HomePage from "../../models/pages/HomePage";
import FooterComponent from "../../models/components/global/footer/FooterComponent";
import InformationColumnComponent from "../../models/components/global/footer/InformationColumnComponent";

export default class FooterTestFlow {

    constructor (private page: Page) {
        this.page = page;
    }

    //service method
    async verifyFooterComponent(): Promise<void> {
        await this.verifyInformationColumn();
        this.verifyCustomServiceColumn();
        this.verifyAccountColumn();
        this.verifyFollowUsColumn();

    }

    //support methods
    private async verifyInformationColumn(): Promise<void> {
        const homePage: HomePage = new HomePage(this.page);
        const footerComponent: FooterComponent = homePage.footerComponent();
        const infoComponent: InformationColumnComponent = footerComponent.informationColumnComponent();
        const title = await infoComponent.title().textContent();
        console.log(`Title: ${title}`);
        
    }

    private verifyCustomServiceColumn(): void {
        
    }

    private verifyAccountColumn(): void {
        
    }

    private verifyFollowUsColumn(): void {
        
    }
}