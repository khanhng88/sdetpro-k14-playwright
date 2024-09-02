import { Locator, Page } from "@playwright/test";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ComputerEssentialComponents from "../../models/components/computer/ComputerEssentialsComponents";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckoutPage from "../../models/pages/CheckoutPage";
import CheckoutOptionsPage from "../../models/pages/CheckoutOptionsPage";
import defaultCheckoutUserData from "../../test-data/DefaultCheckoutUser.json";
import BillingAddressComponent from "../../models/components/checkout/BillingAddressComponent";
import ShippingAddressComponent from "../../models/components/checkout/ShippingAddressComponent";
import ShippingMethodComponent from "../../models/components/checkout/ShippingMethodComponent";


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
          //test shopping cart page
  const shoppingCartPage: ShoppingCartPage =  new ShoppingCartPage(this.page);
  const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
  const totalComponent = shoppingCartPage.totalComponent();

  for (let cartItemRowComponent of cartItemRowComponentList) {
    const unitPrice = await cartItemRowComponent.unitPrice();
    const quantity = await cartItemRowComponent.quantity();
    const subTotal = await cartItemRowComponent.subTotal();
    console.log(`unit price ${unitPrice} quantity ${quantity} subtotal ${subTotal}`);
    
  }


  const priceCategories =await totalComponent.priceCategories();
  console.log(`price categories ${JSON.stringify(priceCategories)}`);

    }

    public async agreeTOSAndCheckOut():Promise<void> {
        const shoppingCartPage: ShoppingCartPage =  new ShoppingCartPage(this.page);
        await shoppingCartPage.totalComponent().acceptTOS();
        await shoppingCartPage.totalComponent().clickOnCheckOutBtn();

        const checkoutOptionsPage : CheckoutOptionsPage = new CheckoutOptionsPage(this.page);
        await checkoutOptionsPage.checkoutAsGuest();
    }

    public async inputBillingAddress(): Promise<void> {
        //use default data
        const {
            firstName, lastName, email, country, state, city, add1, zipCode, phoneNum
        } = defaultCheckoutUserData;
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const billingAddressComponent: BillingAddressComponent = checkoutPage.billingAddressComponent();
        await billingAddressComponent.inputFirstName(firstName);
        await billingAddressComponent.inputLastName(lastName);
        await billingAddressComponent.inputEmailAddress(email);
        await billingAddressComponent.selectCountry(country);
        await billingAddressComponent.selectStateProvince(state);
        await billingAddressComponent.inputCity(city);
        await billingAddressComponent.inputAddress1(add1);
        await billingAddressComponent.inputZipCode(zipCode);
        await billingAddressComponent.inputPhoneNum(phoneNum);
        await billingAddressComponent.clickOnContinueBtn();

    }

    public async inputShippingAddress(): Promise<void> {
        //use default data
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingAddressComponent: ShippingAddressComponent = checkoutPage.shippingAddressComponent();
       
        await shippingAddressComponent.clickOnContinueBtn();

    }

    public async selectShippingMethod(): Promise<void> {
        /*
        1. Randomly select a method Math.floor(Math.random() * size of data) -> inrange index
        */
        //use default data
        const shippingOptionSel = 'input[id*="shippingoption"]';
        const shippingOptionElements: Locator[] = await this.page.locator(shippingOptionSel).all();
        const randomIndex = Math.floor(Math.random() * shippingOptionElements.length);

        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingMethodComponent: ShippingMethodComponent = checkoutPage.shippingMethodComponent();
        await shippingOptionElements[randomIndex].click();
       
        await shippingMethodComponent.clickOnContinueBtn();

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