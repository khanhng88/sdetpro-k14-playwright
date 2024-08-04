import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponents from "../../models/components/computer/ComputerEssentialsComponents";

export default class OrderComputerFlow {
    private totalPrice: number;
    private productQuantity: number;
    constructor(private page:Page, private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponents>){
        this.page = page;
        this.computerComponentClass = computerComponentClass;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
       
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessor = await computerComp.selectProcessorType("2.2 GHz");
        const selectedRam = await computerComp.selectRamType("4GB");
        const selectedHDD = await computerComp.selectHDDType("400 GB");
        // await computerComp.selectOSType("Windows 10");
        // await computerComp.selectSoftwareType("Office Suite");
        console.log(`${this.extractAdditionalPrice(selectedProcessor)}} ${this.extractAdditionalPrice(selectedRam)} ${this.extractAdditionalPrice(selectedHDD)}`);
         
        const basePrice = await computerComp.getProductPrice();
        const additionalPrices =
        this.extractAdditionalPrice(selectedProcessor) + 
        this.extractAdditionalPrice(selectedHDD) +
        this.extractAdditionalPrice(selectedRam);
        this.productQuantity = await computerComp.getProductQuantity();
        this.totalPrice = ( basePrice + additionalPrices ) * this.productQuantity;

        console.log(`Total price ${this.totalPrice}` );
        computerComp.clickAddToCartBtn();

        //handle add to cart
        const barNotificationText = await computerDetailsPage.getBarNotificationText()
        if(!barNotificationText?.startsWith("The product has been added")) {
            throw new Error("Failed to add product to cart");
            
        }

        //go to shopping cart
        computerDetailsPage.headerComp().clickShoppingCartLink();
        
    }

    private extractAdditionalPrice(fullText: string|null): number {
        const regex = /\+\d+\.\d+/g;
        const matches = fullText?.match(regex);
        if(matches) {
            return Number(matches[0].replace('+',''));
        }
        return 0;
        
    }
}