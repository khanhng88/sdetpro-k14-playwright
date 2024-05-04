import { Page } from "@playwright/test";

export default class LoginPageMethod1 {

    //scope to keep element selector
    private userNameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';


    //constructor
    constructor(private page: Page) {
        this.page = page;
    }
    
    
    //main interaction method
    async inputUsername(username: string) {
        await this.page.locator(this.userNameLoc).fill(username);
    }

    async inputPassword(password: string) {
        await this.page.locator(this.passwordLoc).fill(password);
    }

    async clickLoginBtn() {
        await this.page.locator(this.loginBtnLoc).click();
    }



}