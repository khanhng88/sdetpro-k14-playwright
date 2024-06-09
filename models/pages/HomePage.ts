import { Page } from "@playwright/test";
import SearchComponent from "../components/global/header/SearchComponent";
import ProductItemComponent from "../components/ProductItemComponent";
import HeaderComponent from "../components/global/header/HeaderComponent";
import PageBodyComponent from "../components/PageBodyComponent";
import FooterComponent from "../components/global/footer/FooterComponent";

export default class HomePage {

    constructor(private page: Page) {
        this.page = page;
    }

    headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.selector));
    }

    pageBodyComponent(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.selector));
    }

    footerComponent(): FooterComponent {
        return new FooterComponent(this.page.locator(FooterComponent.selector));
    }

    // searchComponent(): SearchComponent {
    //     return new SearchComponent(this.page.locator(SearchComponent.selector));
    // }

    // async productItemComponentList(): Promise<ProductItemComponent[]> {
    //     const productItemComponents = await this.page.locator(ProductItemComponent.selector).all();
    //     return productItemComponents.map(comp => new ProductItemComponent(comp))
    // }
}