import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-billing")
export default class BillingAddressComponent {

    protected component: Locator;
    private firstNameSel = '#BillingNewAddress_FirstName';
    private lastNameSel = '#BillingNewAddress_LastName';
    private emailAddressSel = '#BillingNewAddress_Email';
    private countryDropdownSel = '#BillingNewAddress_CountryId';
    private stateProvinceDropdownSel = '#BillingNewAddress_StateProvinceId';
    private citySel = '#BillingNewAddress_City';
    private addr1Sel = '#BillingNewAddress_Address1';
    private zipCodeSel = '#BillingNewAddress_ZipPostalCode';
    private phoneNumSel = '#BillingNewAddress_PhoneNumber';
    private continueBtnSel = 'input[value="Continue"]';


    protected constructor(component: Locator) {
        this.component = component;
    }

    public async inputFirstName(firstName: string): Promise<void> {
        await this.component.locator(this.firstNameSel).fill(firstName);
    }

    public async inputLastName(lastName: string): Promise<void> {
        await this.component.locator(this.lastNameSel).fill(lastName);
    }

    public async inputEmailAddress(emailAddress: string): Promise<void> {
        await this.component.locator(this.emailAddressSel).fill(emailAddress);
    }
    
    public async selectCountry(country: string): Promise<void>{
        await this.component.locator(this.countryDropdownSel).selectOption({label: country})
    }

    public async selectStateProvince(stateProvince: string): Promise<void>{
        await this.component.locator(this.stateProvinceDropdownSel).selectOption({label: stateProvince})
    }

    public async inputCity(cityName: string): Promise<void> {
        await this.component.locator(this.citySel).fill(cityName);
    }

    public async inputAddress1(address1: string): Promise<void> {
        await this.component.locator(this.addr1Sel).fill(address1);
    }

    public async inputZipCode(xipcode: string): Promise<void> {
        await this.component.locator(this.zipCodeSel).fill(xipcode);
    }

    public async inputPhoneNum(phoneNum: string): Promise<void> {
        await this.component.locator(this.phoneNumSel).fill(phoneNum);
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: 'hidden', timeout: 5 * 1000});
    }

}