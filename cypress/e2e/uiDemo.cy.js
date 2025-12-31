import CartPage from "../pages/cartPage.js";
import InventoryPage from "../pages/inventoryPage.js";
import LoginPage from "../pages/LoginPage.js"
import topTwoItems from "../fixtures/topTwoItems.json"

let login = new LoginPage();
let inventory = new InventoryPage();
let cart = new CartPage();

describe("UI demo Add to Cart", () => {

    it("Login and add to cart", () => {

        try {

            let firstItem = [];
            let secondItem = [];

            // Login to the page
            login.visitUrl();

            login.login("standard_user", "secret_sauce");
            cy.url().should("include", inventory.url)
            cy.get(inventory.headerlabel).should("have.text", inventory.header)
            cy.log("-------- Login Completed successfully --------")

            // order by price high to low
            cy.log("-------- Sorting product high to low --------");
            inventory.sortProduct("highLow");

            // checking the first product
            cy.get(inventory.itemPrice).first()
                .should("contain", topTwoItems.items[0].price)
                .invoke("text")
                .then(itemPrice => {
                    let price = itemPrice.trim();

                    cy.get(inventory.itemName).first()
                        .should("have.text", topTwoItems.items[0].name)
                        .invoke("text")
                        .then(itemName => {
                            let name = itemName.trim();

                            firstItem.push({ name, price })
                            cy.log("firstItem details: " + "name: " + firstItem[0].name + ", price: " + firstItem[0].price)
                        })

                })
            // finding 2nd nth element and verifying
            cy.get(inventory.itemPrice).eq(1)
                .should("contain", topTwoItems.items[1].price)
                .invoke("text")
                .then(itemPrice => {
                    let price = itemPrice.trim();

                    cy.get(inventory.itemName).eq(1)
                        .should("have.text", topTwoItems.items[1].name)
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

            // checking if there are exactly two items in the cart list
            cart.getCartLength().then(length => {
                expect(length).to.eq(2);
                cy.log("------ Cart Length Validated ------")
            })

            cy.log("-------- Checking the Cart Items and check if it is same as we expect --------")
            cart.getItemName(0).then(name => {
                // checking if the item is in any item list that was added earlier
                const exists = firstItem.concat(secondItem).some(item => item.name === name);
                expect(exists).to.be.true;
                cy.log("------ 1st cart item Verified: " + name + " ------");
            });

            cart.getItemName(1).then(name => {
                const exists = firstItem.concat(secondItem).some(item => item.name === name);
                expect(exists).to.be.true;
                cy.log("------ 2nd cart item Verified: " + name + " ------");
            });

            cy.log("-------- Cart Item Verified ---------")

        } catch (e) {
            console.log("Something went Wrong!" + e);
            cy.log("Soemthing went Wrong!" + e)
        }

    })
})