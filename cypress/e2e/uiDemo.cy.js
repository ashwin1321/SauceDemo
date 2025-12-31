import LoginPage from "../pages/LoginPage.js"

let login = new LoginPage();

describe("UI demo Add to Cart", () => {


    it("Login and add to cart", () => {

        try {

            // Login to the page

            login.visitUrl();

            login.login("standard_user", "secret_sauce");
            cy.url().should("include", "/inventory")
            cy.get("div.header_label").should("have.text", "Swag Labs")
            cy.log("-------- Login Completed successfully --------")

            // order by price high to low

        } catch (e) {
            console.log("Something went Wrong!" + e);
            cy.log("Soemthing went Wrong!" + e)
        }

    })
})