import {
  MENU_ITEMS_DATA_AUTO_ENUM,
  MENU_LABEL_ENUM,
  SETTINGS_SUBMENU_DATA_AUTO_ENUM,
  SETTINGS_SUBMENU_LABEL_ENUM,
} from "../../enum/menuItems";
import { studentStatusPage } from "../../pages/settings/studentStatusPage";

describe("Application Status Page, Create, Update and Delete", function () {
  //  GET ENVIRONMENT VARIABLES
  const BACKEND_URL = `${Cypress.env("BACKEND_URL")}/api`; // URL of the backend API
  const FRONTEND_URL = Cypress.env("FRONTEND_URL"); // URL of the frontend
  const email = Cypress.env("email"); // Email address for login
  const password = Cypress.env("password"); // Password for login
  // BEFORE START OF TEST
  beforeEach(() => {
    cy.fixture("studentStatus").as("studentStatus");
    //
    // Perform API login to retrieve authentication token and business ID
    cy.request({
      method: "POST",
      url: `${BACKEND_URL}/v1.0/login`, // Login endpoint
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: { email, password }, // Login credentials
    }).then((response) => {
      expect(response.status).to.eq(200); // Assert login success
      const businessId = response.body.data.business_id; // Extract business ID
      const token = response.body.data.token; // Extract authentication token
      cy.wrap(businessId).as("businessId");
      cy.wrap(token).as("token");
    });
  });
  it("should create, update and delete application status", function () {
    // Retrieve data for creating student status
    const createData = this.studentStatus?.createData;
    const updateData = this.studentStatus?.updateData;
    // Visit the login page and login using the email and password
    cy.visit(`${FRONTEND_URL}/auth/login`);
    cy.login(email, password);
    // OPEN SIDE BAR MENU
    cy.wait(1000);
    studentStatusPage.pageElements.menuToggleButton().click();
    // CLICK SETTINGS MENU
    cy.wait(500);
    cy.get(MENU_ITEMS_DATA_AUTO_ENUM.Settings)
      .first()
      .should("be.visible")
      .and("have.text", MENU_LABEL_ENUM.Settings)
      .click();
    // CLICK APPLICATION SUB MENU
    cy.wait(1000);
    cy.get(SETTINGS_SUBMENU_DATA_AUTO_ENUM.ApplicationStatus)
      .first()
      .should("be.visible")
      .and("have.text", SETTINGS_SUBMENU_LABEL_ENUM.ApplicationStatus)
      .click();
    // Click the "Create" button to open the form
    studentStatusPage.pageElements
      .createButton()
      .should("be.visible")
      .and("have.text", "Create")
      .click();
    // Fill in the "Name" field with the value from the fixture
    cy.wait(1000);
    studentStatusPage.formElements
      .name()
      .should("be.visible")
      .type(createData?.name);
    // Fill in the "Description" field with the value from the fixture
    // We need to remove the "disabled" attribute from the field first
    // because Cypress doesn't allow typing into a disabled field
    studentStatusPage.formElements
      .description()
      .should("be.visible")
      .invoke("removeAttr", "disabled")
      .type(createData?.description);
    // Click the "Create Application Status" button to submit the form
    studentStatusPage.formElements
      .submitButton()
      .should("be.visible")
      .and("have.text", "Create Application Status")
      .click();
    //
    cy.wait(1000);
    cy.request({
      method: "GET",
      url: `${BACKEND_URL}/v1.0/student-statuses`, // Business endpoint
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // Assert success
      const data = response.body;
      // Verify that the created student status is present in the response
      data.forEach((item) => {
        if (item?.name === createData?.name) {
          expect(item?.name).to.eq(createData?.name);
          expect(item?.description).to.eq(createData?.description);
          // Click the "Edit" button to open the form
          studentStatusPage.pageElements
            .editButton(item?.id)
            .first()
            .should("have.length", 1)
            .click({ multiple: true, force: true });
          // Fill in the "Name" field with the value from the fixture
          cy.wait(500);
          studentStatusPage.formElements
            .name()
            .should("be.visible")
            .and("have.value", createData?.name)
            .clear({ force: true })
            .type(updateData?.name);
          // Fill in the "Description" field with the value from the fixture
          // We need to remove the "disabled" attribute from the field first
          // because Cypress doesn't allow typing into a disabled field
          studentStatusPage.formElements
            .description()
            .should("be.visible")
            .and("have.value", createData?.description)
            .clear({ force: true })
            .invoke("removeAttr", "disabled")
            .type(updateData?.description);
          // Click the "Update Application Status" button to submit the form
          studentStatusPage.formElements
            .submitButton()
            .should("be.visible")
            .and("have.text", "Update Application Status")
            .click();
          //
          cy.wait(2000);
          // Click the "Delete" button
          studentStatusPage.pageElements
            .deleteButton(item?.id)
            .first()
            .should("have.length", 1)
            .click({ multiple: true, force: true });
          // CLICK DELETE CONFIRM BUTTON
          cy.wait(1000);
          cy.get(`[data-auto="delete_confirmation_button"]`)
            .should("be.visible")
            .and("have.text", "Delete")
            .click();
          // LOG OUT
          cy.wait(2000);
          cy.logout();
        }
      });
    });
  });
});
