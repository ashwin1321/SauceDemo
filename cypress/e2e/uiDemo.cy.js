import LoginPage from "../pages/LoginPage.js"

let login = new LoginPage();

describe("UI demo Add to Cart", () => {


    it("Login and add to cart", () => {

        login.visitUrl();

        login.login("standard_user", "secret_sauce");
        cy.get("div.header_label").should("have.text", "Swag Labs")
    })
})