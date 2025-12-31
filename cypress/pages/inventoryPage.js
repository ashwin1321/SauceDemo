export default class InventoryPage {

    constructor() {

        // define eleents
        this.selectDropdown = "select.product_sort_container[data-test='product-sort-container']"
        this.header = "div.header_label"
        this.addToCartId = "#add-to-cart"
        this.carticon = "[data-test='shopping-cart-badge']"
        this.itemPrice = ".inventory_item_price"
        this.itemName = ".inventory_item_name"
        this.highLow = "hilo"
        this.az = "az";
        this.za = "za";
        this.lowHigh = "lohi";
    }

    sortProduct(sortOption) {
        cy.get(this.selectDropdown).select(this[sortOption]);
    }

    getAddToCartId(name) {
        let itemName = name.toLowerCase().replace(/ /g, '-');
        return this.addToCartId + "-" + itemName;
    }

    addToCart(addToCartId) {
        cy.get(addToCartId).click();
    }
}