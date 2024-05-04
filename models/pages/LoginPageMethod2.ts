import { Locator, Page } from "@playwright/test";

export default class LoginPageMethod1 {

    //scope to keep element selector
    private userNameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';


    //constructor
    constructor(private page: Page) {
        this.page = page;
    }

    //return found element
    username(): Locator {
        return this.page.locator(this.userNameLoc);
    }
    
    password(): Locator {
        return this.page.locator(this.passwordLoc);
    }

    loginBtn(): Locator {
        return this.page.locator(this.loginBtnLoc);
    }
    
}