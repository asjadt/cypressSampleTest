// import {
//   MENU_ITEMS_DATA_AUTO_ENUM,
//   MENU_LABEL_ENUM,
// } from "../../enums/menuItems";

import {
  MENU_ITEMS_DATA_AUTO_ENUM,
  MENU_LABEL_ENUM,
} from "../../enum/menuItems";
import { staffPage } from "../../pages/staff/staffPage";

// import { staffPage } from "../../pages/staff/staffPage";
describe("create, update and delete staff", function () {
  const FRONTEND_URL = Cypress.env("FRONTEND_URL"); // URL of the frontend
  const BACKEND_URL = `${Cypress.env("BACKEND_URL")}/api`; // URL of the frontend
  const email = Cypress.env("email"); // Email address for login
  const password = Cypress.env("password"); // Password for login
  // BEFORE START OF TEST
  beforeEach(function () {
    // Load the fixture data for staffData
    cy.fixture("staffData").as("staffData");
    // Perform API login to retrieve authentication token and business ID
    cy.request({
      method: "POST",
      url: `${BACKEND_URL}/v1.0/login`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: { email, password },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const businessId = response.body.data.business_id;
      const token = response.body.data.token;
      cy.wrap(businessId).as("businessId");
      cy.wrap(token).as("token");
    });
  });
  // CREATE, UPDATE AND DELETE STAFF
  it("should create update and delete staff", function () {
    const randomEmail = `cypress${Math.random()
      .toString()
      .substring(2, 10)}@yopmail.com`;
    // GET DATA FROM FIXTURE
    const createData = this.staffData.createData;
    const updateData = this.staffData.updateData;
    // Visit the login page and login using the email and password
    cy.visit(`${FRONTEND_URL}/auth/login`);
    cy.login(email, password);
    // OPEN SIDE BAR MENU
    cy.wait(1000);
    staffPage.pageElements.menuToggleButton().click();
    // CLICK STAFF MENU
    cy.wait(1000);
    cy.get(MENU_ITEMS_DATA_AUTO_ENUM.Staffs)
      .first()
      .should("be.visible")
      .and("have.text", MENU_LABEL_ENUM.Staffs)
      .click();
    cy.wait(1000);
    // Click the "Create" button to open the form
    staffPage.pageElements
      .createButton()
      .should("be.visible")
      .and("have.text", "Create")
      .click();
    // WAIT 2 SECOND TO VISIBLE FORM
    cy.wait(2000);
    // Fill in the "Name" field with the value from the fixture
    staffPage.formElements
      .first_Name()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.first_Name);
    // Fill in the "Last Name" field with the value from the fixture
    staffPage.formElements
      .last_Name()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.last_Name);
    // Fill in the "Email" field with the value from the fixture
    staffPage.formElements
      .email()
      .should("be.visible")
      .clear()
      .type(randomEmail);
    // Fill in the "Phone" field with the value from the fixture
    staffPage.formElements
      .phone()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.phone);
    // Fill in the "Address Line 1" field with the value from the fixture
    staffPage.formElements
      .address_line_1()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.address_line_1);
    // Fill in the "Country" field with the value from the fixture
    staffPage.formElements
      .country()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.country);
    // Fill in the "City" field with the value from the fixture
    staffPage.formElements
      .city()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.city);
    // Fill in the "Postcode" field with the value from the fixture
    staffPage.formElements
      .postcode()
      .should("be.visible")
      .clear() // Clear any existing value
      .type(createData.postcode);
    //SELECT  "Role" with the value from the fixture
    staffPage.formElements.role.select().should("be.visible").click();
    staffPage.formElements.role
      .options()
      .should("be.visible")
      .contains(createData.role)
      .click();
    // Click the "Create Staff" button to submit the form
    staffPage.formElements
      .submitButton()
      .should("be.visible")
      .and("have.text", "Create Staff")
      .click();
    // WAIT 1 SECOND FOR GETTING ALL STAFF DATA
    cy.wait(1000);
    // GET ALL STAFF DATA
    cy.request({
      method: "GET",
      url: `${BACKEND_URL}/v1.0/users`, // user endpoint
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.forEach((item) => {
        // GET CREATED STAFF BY MATCHING EMAIL
        if (item?.email === randomEmail) {
          expect(item?.email).to.eq(randomEmail);
          // Click the "Edit" button to open the form
          staffPage.pageElements
            .editButton(item?.id)
            .first()
            .should("have.length", 1)
            .click();
          // Fill in the "Name" field with the value from the fixture
          staffPage.formElements
            .first_Name()
            .should("be.visible")
            .and("have.value", createData.first_Name) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.first_Name);
          // Fill in the "Last Name" field with the value from the fixture
          staffPage.formElements
            .last_Name()
            .should("be.visible")
            .and("have.value", createData.last_Name) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.last_Name);
          // Fill in the "Email" field with the value from the fixture
          staffPage.formElements
            .email()
            .should("be.visible")
            .and("have.value", randomEmail); // CHECKING CREATED VALUE
          // .clear()
          // .type(updateData.email);
          // Fill in the "Phone" field with the value from the fixture
          staffPage.formElements
            .phone()
            .should("be.visible")
            .and("have.value", createData.phone) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.phone);
          // Fill in the "Address Line 1" field with the value from the fixture
          staffPage.formElements
            .address_line_1()
            .should("be.visible")
            .and("have.value", createData.address_line_1) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.address_line_1);
          // Fill in the "Country" field with the value from the fixture
          staffPage.formElements
            .country()
            .should("be.visible")
            .and("have.value", createData.country) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.country);
          // Fill in the "City" field with the value from the fixture
          staffPage.formElements
            .city()
            .should("be.visible")
            .and("have.value", createData.city) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.city);
          // Fill in the "Postcode" field with the value from the fixture
          staffPage.formElements
            .postcode()
            .should("be.visible")
            .and("have.value", createData.postcode) // CHECKING CREATED VALUE
            .clear() // Clear any existing value
            .type(updateData.postcode);
          //SELECT  "Role" with the value from the fixture
          staffPage.formElements.role.select().should("be.visible").click();
          staffPage.formElements.role
            .options()
            .should("be.visible")
            .contains(updateData.role)
            .click();
          // Click the "Update Staff" button to submit the form
          staffPage.formElements
            .submitButton()
            .should("be.visible")
            .and("have.text", "Update Staff")
            .click();
          // WAIT 1 SECOND FOR GETTING ALL STAFF DATA
          cy.wait(1000);
          // CLICK DELETE BUTTON
          staffPage.pageElements
            .deleteButton(item?.id)
            .should("be.visible")
            .first()
            .click();
          // CLICK DELETE CONFIRM BUTTON AND WAIT 1 SECONDS
          cy.wait(1000);
          staffPage.pageElements
            .deleteConfirmationButton()
            .should("be.visible")
            .and("have.text", "Delete")
            .click();
          // WAIT 1 SECOND AND CLICK OK
          // LOG OUT
          cy.wait(2000);
          cy.logout();
        }
      });
    });
  });
});
