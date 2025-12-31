export default class LoginPage {

    constructor() {

        // define element

        this.uname = "#user-name",
            this.password = "#password"
        this.loginButton = "#login-button"
    }

    // visit the link
    visitUrl() {
        cy.visit("/")
    }

    login(username, password) {

        cy.get(this.uname).type(username)
        cy.get(this.password).type(password)
        cy.get(this.loginButton).click();
    }

    // enter creds and login
}