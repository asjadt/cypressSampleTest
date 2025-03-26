"use strict";
/* <======================================= ADD CUSTOM COMMAND FOR // CREATE AWARDING BODY =======================================> */
Cypress.Commands.add("createAwardingBody", function () {
    // GET DATA FROM FIXTURE
    cy.fixture("awardingBodyData").then(function (awardingBodyData) {
        // GET TOKEN
        cy.get("@token").then((token) => {
            // CREATE AWARDING BODY
            cy.request({
                method: "POST",
                url: `${Cypress.env("BACKEND_URL")}/api/v1.0/awarding-bodies`,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: awardingBodyData.createData,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log("Awarding body created successfully.");
                cy.wrap(response.body).as("createAwardingBodyData");
            });
            // UPDATE AWARDING BODY
            cy.request({
                method: "POST",
                url: `${Cypress.env("BACKEND_URL")}/api/v1.0/awarding-bodies`,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: awardingBodyData.updateData,
            }).then((response) => {
                expect(response.status).to.eq(201);
                cy.log("Awarding body created successfully.");
                cy.wrap(response.body).as("updateAwardingBodyData");
            });
            // END TOKEN
        });
        // END FIXTURE
    });
    // END
});
/* <======================================= ADD CUSTOM COMMAND FOR // DELETE AWARDING BODY =======================================> */
Cypress.Commands.add("deleteAwardingBody", function () {
    cy.request({
        method: "DELETE",
        url: `${Cypress.env("BACKEND_URL")}/api/v1.0/awarding-bodies/${[
            this.createAwardingBodyData.id,
            this.updateAwardingBodyData.id,
        ].join(",")}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
        },
    }).then((result) => {
        expect(result.status).to.eq(200);
        cy.log("Awarding body record deleted successfully.");
    });
});
