export default class CartPage {

    constructor() {
        this.itemList = "[data-test='cart-list']";
        this.itemName = "[data-test='inventory-item-name']";
        this.cartItem = ".cart_item"
    }

    getItemName(child) {
        return cy.get(`${this.itemList} ${this.itemName}`)
            .eq(child)
            .invoke("text")
            .then(text => text.trim());
    }

    getCartLength() {
        return cy.get(this.cartItem).its("length");
    }
}
