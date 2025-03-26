"use strict";
// Adds a custom Cypress command for logging in
Cypress.Commands.add("login", (email, password) => {
    // Enter the email address
    cy.get(`[data-auto="email"]`).should("be.visible").clear().type(email);
    // Enter the password
    cy.get(`[data-auto="password"]`).should("be.visible").clear().type(password);
    // Click the login button
    cy.get(`[data-auto="login-btn"]`)
        .should("be.visible")
        .and("have.text", "Login")
        .click()
        .log(`Logging in as ${email}`);
});
// Adds a custom Cypress command for logging out
Cypress.Commands.add("logout", function () {
    // Open the profile dropdown
    cy.get(`[data-auto="profile_dropdown"]`).should("be.visible").click();
    // Click the logout button
    cy.get(`[data-auto="logout_btn"]`)
        .should("be.visible")
        .and("have.text", "Logout")
        .click()
        .log(`Logging out`);
});
/* <======================================= ADD CUSTOM COMMAND FOR LOGIN =======================================> */
Cypress.Commands.add("loginV2", function ({ email, password }) {
    cy.request({
        method: "POST",
        url: `${Cypress.env("BACKEND_URL")}/api/v1.0/login`, //
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: { email, password },
    }).then((response) => {
        // CHECK API RESPONSE STATUS
        expect(response.status).to.eq(200);
        cy.log("Login API called successfully.");
        // STORE AUTHENTICATION TOKEN AND USER DATA
        const token = response?.body?.data?.token;
        const user = response?.body?.data;
        // SET TOKEN & USER DATA IN LOCAL STORAGE
        cy.wrap(token).as("token");
        cy.wrap(user).as("user");
    });
});
