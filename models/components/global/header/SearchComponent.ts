import { Locator, Page } from "@playwright/test";

export default class SearchComponent {

    public static selector = '.search-box';

    private searchBoxLoc = 'input[id="small-searchterms"]';
    private searchBtnLoc = 'input[type="submit"]';

    constructor(private component: Locator) {
        this.component = component;
    }

    //narrow down searching scope -> find search elements from search compoenent
    searchBox(): Locator {
        return this.component.locator(this.searchBoxLoc);
    }

    searchBtn(): Locator {
        return this.component.locator(this.searchBtnLoc);
    }
}