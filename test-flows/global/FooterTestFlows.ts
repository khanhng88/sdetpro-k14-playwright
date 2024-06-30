import { Page } from "@playwright/test";
import HomePage from "../../models/pages/HomePage";
import FooterComponent from "../../models/components/global/footer/FooterComponent";
import InformationColumnComponent from "../../models/components/global/footer/InformationColumnComponent";
import FooterColumnComponent from "../../models/components/global/footer/FooterColumnComponent";
import assert from 'assert';

export default class FooterTestFlow {

    constructor (private page: Page) {
        this.page = page;
    }

    //service method
    async verifyFooterComponent(): Promise<void> {
        const homePage: HomePage = new HomePage(this.page);
        const footerComponent: FooterComponent = homePage.footerComponent();
        await this.verifyInformationColumn(footerComponent);
        this.verifyCustomServiceColumn(footerComponent);
        this.verifyAccountColumn(footerComponent);
        this.verifyFollowUsColumn(footerComponent);

    }

    //support methods
    private async verifyInformationColumn(footerComponent: FooterComponent): Promise<void> {
        // const homePage: HomePage = new HomePage(this.page);
        // const footerComponent: FooterComponent = homePage.footerComponent();
        const infoComponent: InformationColumnComponent = footerComponent.informationColumnComponent();
        // const title = await infoComponent.title().textContent();
        // console.log(`Title: ${title}`);
        await this.verifyFooterColumn(infoComponent,
            ["Sitemap","Shipping & Returns","Privacy Notice","Conditions of Use","About us","Contact us"],
            ["/sitemap","/shipping-returns","/privacy-policy","/conditions-of-use","/about-us","/contactus"])
        
    }

    private verifyCustomServiceColumn(footerComponent: FooterComponent): void {
        
    }

    private verifyAccountColumn(footerComponent: FooterComponent): void {
        
    }

    private verifyFollowUsColumn(footerComponent: FooterComponent): void {
        
    }

    private async verifyFooterColumn(
        footerColumn: FooterColumnComponent,
        expectedLinkText: string[] = [],
        expectedHrefs: string[]
    ): Promise<void> {
        const actualLinkText: string[] = [];
        const actualHrefs: string[] = [];

        const footerCompLinks=  await footerColumn.links();
        for (let link of footerCompLinks) {
            const linktext = await link.textContent();
            const href = await link.getAttribute('href');
            actualLinkText.push(linktext);
            actualHrefs.push(href);
        }
        assert.deepStrictEqual(actualLinkText, expectedLinkText,`ACtual link text ${actualLinkText} and expected link text ${expectedLinkText} not matched` );
        assert.deepStrictEqual(actualHrefs, expectedHrefs, `ACtual href text ${actualHrefs} and expected href text ${expectedHrefs} not matched`);
    }
}