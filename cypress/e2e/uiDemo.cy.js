import InventoryPage from "../pages/inventoryPage.js";
import LoginPage from "../pages/LoginPage.js"

let login = new LoginPage();
let inventory = new InventoryPage();

describe("UI demo Add to Cart", () => {


    it("Login and add to cart", () => {

        try {

            let firstItem = [];
            let secondItem = [];

            // Login to the page
            login.visitUrl();

            login.login("standard_user", "secret_sauce");
            cy.url().should("include", "/inventory")
            cy.get("div.header_label").should("have.text", "Swag Labs")
            cy.log("-------- Login Completed successfully --------")

            // order by price high to low
            cy.log("-------- Sorting product high to low --------");
            inventory.sortProduct("highLow");

            // checking the first product
            cy.get(inventory.itemPrice).first()
                .should("contain", "$49.99")
                .invoke("text")
                .then(itemPrice => {
                    let price = itemPrice.trim();

                    cy.get(inventory.itemName).first()
                        .should("have.text", "Sauce Labs Fleece Jacket")
                        .invoke("text")
                        .then(itemName => {
                            let name = itemName.trim();

                            firstItem.push({ name, price })
                            cy.log("firstItem details: " + "name: " + firstItem[0].name + ", price: " + firstItem[0].price)
                        })

                })
            // finding 2nd nth element and verifying
            cy.get(inventory.itemPrice).eq(1)
                .should("contain", "$29.99")
                .invoke("text")
                .then(itemPrice => {
                    let price = itemPrice.trim();

                    cy.get(inventory.itemName).eq(1)
                        .should("have.text", "Sauce Labs Backpack")
                        .invoke("text")
                        .then(itemName => {
                            let name = itemName.trim();

                            secondItem.push({ name, price })
                            cy.log("secondItem details: " + "name: " + secondItem[0].name + ", price: " + secondItem[0].price)
                        })

                })
            cy.log("--------- Verified Sorted Items --------")


            // add first and second item to the cart
            cy.then(() => {

                cy.log("------- choosing 1st and 2nd item from the list -------")
                let addToCartId1 = inventory.getAddToCartId(firstItem[0].name);
                let addToCartId2 = inventory.getAddToCartId(secondItem[0].name);

                inventory.addToCart(addToCartId1);
                inventory.addToCart(addToCartId2);

                // validate the cart menu icon to have 2 items notification
                cy.get(inventory.carticon).should("have.text", 2);

                cy.log("-------- first and second item added to the add to cart list -----")
            })

            // check if the exact item is present in the cart list
            cy.get(inventory.carticon).click();
            cy.url().should("include", "cart");
            cy.log("-------- Cart Icon Clicked, redirected to the cart page ------")




        } catch (e) {
            console.log("Something went Wrong!" + e);
            cy.log("Soemthing went Wrong!" + e)
        }

    })
})