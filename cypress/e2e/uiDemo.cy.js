import CartPage from "../pages/cartPage.js";
import InventoryPage from "../pages/inventoryPage.js";
import LoginPage from "../pages/LoginPage.js"
import topTwoItems from "../fixtures/topTwoItems.json"

let login = new LoginPage();
let inventory = new InventoryPage();
let cart = new CartPage();

describe("UI demo Add to Cart", () => {

    it("Login and add to cart", () => {

        // Login to the page
        login.visitUrl();

        login.login("standard_user", "secret_sauce");
        cy.url().should("include", inventory.url)
        cy.get(inventory.headerlabel).should("have.text", inventory.header)
        cy.log("-------- Login Completed successfully --------")

        // order by price high to low
        cy.log("-------- Sorting product high to low --------");
        inventory.sortProduct("highLow");

        // checking the item dynamcally and addting them to cart
        topTwoItems.items.forEach((item, index) => {
            cy.log("------ finding 1st and 2nd element after sorting and validating ----------")
            cy.get(inventory.itemPrice).eq(index).should("contain", item.price);
            cy.get(inventory.itemName).eq(index).should("have.text", item.name);
            cy.log("-------- Sorted Items validated successfully ----------")

            cy.log("----- locating the correct item and adding it to cart -----")
            let addToCartId = inventory.getAddToCartId(item.name);
            inventory.addToCart(addToCartId);
            cy.log("----- items added to cart ----")
        });

        cy.get(inventory.carticon).should("have.text", topTwoItems.items.length);
        cy.log("-------- Validated the add to cart item numbers --------")

        // clicking cart icon
        cy.get(inventory.carticon).click();
        cy.url().should("include", "cart");
        cy.log("-------- Cart Icon Clicked, redirected to the cart page ------")

        // checking if there are exactly two items in the cart list
        cart.getCartLength().then(length => {
            expect(length).to.eq(topTwoItems.items.length);
            cy.log("------ Cart Length Validated ------")
        })

        cy.log("-------- Checking the Cart Items and check if it is same as we expect --------")

        topTwoItems.items.forEach((item, index) => {
            cart.getItemName(index).then(name => {
                // checking if the item is in any item list that was added earlier
                const exists = topTwoItems.items.some(item => item.name === name);
                expect(exists).to.be.true;
                cy.log("------ added cat name verified " + name + " ------");
            });
        })
        cy.log("-------- Cart Item Verified ---------")

    })
})