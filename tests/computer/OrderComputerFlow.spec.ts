import { Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponents from "../../models/components/computer/ComputerEssentialsComponents";

export default class OrderComputerFlow {
    private totalPrice: number;
    private productQuantity: number;
    constructor(
        private readonly page:Page,
        private readonly computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponents>,
        private readonly computerData: any){
        this.page = page;
        this.computerComponentClass = computerComponentClass;
        this.computerData = computerData;
    }

    async buildCompSpecAndAddToCart(): Promise<void> {
       
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessor = await computerComp.selectProcessorType(this.computerData.processorType);
        const selectedRam = await computerComp.selectRamType(this.computerData.ram);
        const selectedHDD = await computerComp.selectHDDType(this.computerData.hdd);
        const selectedSoftware= await computerComp.selectSoftwareType(this.computerData.software);

        let additionalOsPrice = 0;
        // await computerComp.selectOSType("Windows 10");
        // await computerComp.selectSoftwareType("Office Suite");
        // console.log(`${this.extractAdditionalPrice(selectedProcessor)}} ${this.extractAdditionalPrice(selectedRam)} ${this.extractAdditionalPrice(selectedHDD)}`);
        
        if(this.computerData.os) {
            const selectedOs= await computerComp.selectOSType(this.computerData.os);
            additionalOsPrice = this.extractAdditionalPrice(selectedOs);
        }
        //calculate current product price
        const basePrice = await computerComp.getProductPrice();
        const additionalPrices =
        this.extractAdditionalPrice(selectedProcessor) + 
        this.extractAdditionalPrice(selectedHDD) +
        this.extractAdditionalPrice(selectedRam) +
        this.extractAdditionalPrice(selectedSoftware) + additionalOsPrice;
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

    public async verifyShoppingCart(): Promise<void> {

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