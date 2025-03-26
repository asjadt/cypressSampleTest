import {
  ADMINISTRATION_SUBMENU_DATA_AUTO_ENUM,
  ADMINISTRATION_SUBMENU_LABEL_ENUM,
  MENU_ITEMS_DATA_AUTO_ENUM,
  MENU_LABEL_ENUM,
} from "../enum/menuItems";
import { awardingBodyPage } from "../pages/awardingBody";
import { navigateToYear } from "../utils/navigateToYear";
import { selectDays } from "../utils/selectDay";
import { selectMonth } from "../utils/selectMonth";

describe("Awarding Body page , create , update and delete", function () {
  //  GET ENVIRONMENT VARIABLES
  const BACKEND_URL = `${Cypress.env("BACKEND_URL")}/api`; // URL of the backend API
  const FRONTEND_URL = Cypress.env("FRONTEND_URL"); // URL of the frontend
  const email = Cypress.env("email"); // Email address for login
  const password = Cypress.env("password"); // Password for login
  // BEFORE START OF TEST
  beforeEach(() => {
    cy.fixture("awardingBodyData").as("awardingBodyData");
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
      const user = response.body.data; // Extract business ID
      const token = response.body.data.token; // Extract authentication token
      cy.wrap(user).as("user");
      cy.wrap(token).as("token");
    });
  });
  it("should create , update and delete awarding body", function () {
    // Retrieve data for creating awarding body
    const createData = this.awardingBodyData?.createData;
    const updateData = this.awardingBodyData?.updateData;
    // Visit the login page and login using the email and password
    cy.visit(`${FRONTEND_URL}/auth/login`);
    cy.login(email, password);
    // OPEN SIDE BAR MENU
    cy.wait(1000);
    awardingBodyPage.pageElements.menuToggleButton().click();
    // CLICK ADMINISTRATION MENU
    cy.wait(500);
    cy.get(MENU_ITEMS_DATA_AUTO_ENUM.Administration)
      .first()
      .should("be.visible")
      .and("have.text", MENU_LABEL_ENUM.Administration)
      .click();
    // CLICK AWARDING BODIES SUB MENU
    cy.wait(1000);
    cy.get(ADMINISTRATION_SUBMENU_DATA_AUTO_ENUM.AwardingBodies)
      .first()
      .should("be.visible")
      .and("have.text", ADMINISTRATION_SUBMENU_LABEL_ENUM.AwardingBodies)
      .click();
    // Click the "Create" button to open the form
    cy.wait(1000);
    awardingBodyPage.pageElements
      .createButton()
      .should("be.visible")
      .and("have.text", "Create")
      .click();
    // Fill in the "Name" field with the value from the fixture
    cy.wait(1000);
    awardingBodyPage.formElements
      .name()
      .should("be.visible")
      .type(createData?.name, { delay: 50 });
    // Fill in the "Start Date" field with the value from the fixture
    const [
      accreditation_start_date_day,
      accreditation_start_date_month,
      accreditation_start_date_year,
    ] = createData.accreditation_start_date.split("-");
    awardingBodyPage.formElements.accreditation_start_date
      .accreditation_start_date()
      .click({ scrollBehavior: false }); // Open date picker
    // cy.scrollTo("top");
    awardingBodyPage.formElements.accreditation_start_date
      .openYearComponent()
      .click({ scrollBehavior: false }); // Navigate to year selection
    navigateToYear({ targetYear: Number(accreditation_start_date_year) }); // Select the correct year
    awardingBodyPage.formElements.accreditation_start_date
      .openMonthComponent()
      .click({ scrollBehavior: false }); // Open month selection
    selectMonth({ targetMonth: Number(accreditation_start_date_month) }); // Select the correct month
    selectDays({ day: Number(accreditation_start_date_day) }); // Select the correct day
    // Fill in the "Expiry Date" field with the value from the fixture
    const [
      accreditation_expiry_date_day,
      accreditation_expiry_date_month,
      accreditation_expiry_date_year,
    ] = createData.accreditation_expiry_date.split("-");
    awardingBodyPage.formElements.accreditation_expiry_date
      .accreditation_expiry_date()
      .click({ scrollBehavior: false }); // Open date picker
    // cy.scrollTo("top");
    awardingBodyPage.formElements.accreditation_expiry_date
      .openYearComponent()
      .click({ scrollBehavior: false }); // Navigate to year selection
    navigateToYear({ targetYear: Number(accreditation_expiry_date_year) }); // Select the correct year
    awardingBodyPage.formElements.accreditation_expiry_date
      .openMonthComponent()
      .click({ scrollBehavior: false }); // Open month selection
    selectMonth({ targetMonth: Number(accreditation_expiry_date_month) }); // Select the correct month
    selectDays({ day: Number(accreditation_expiry_date_day) }); // Select the correct day
    // Fill in the "Description" field with the value from the fixture
    // We need to remove the "disabled" attribute from the field first
    // because Cypress doesn't allow typing into a disabled field
    awardingBodyPage.formElements
      .description()
      .should("be.visible")
      .invoke("removeAttr", "disabled")
      .type(createData?.description, { delay: 50 });
    // Click the "Create Application Status" button to submit the form
    awardingBodyPage.formElements
      .submitButton()
      .should("be.visible")
      .and("have.text", "Create Awarding Body")
      .click();
    //
    cy.wait(1000);
    cy.request({
      method: "GET",
      url: `${Cypress.env("BACKEND_URL")}/api/v1.0/awarding-bodies`, // Business endpoint
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // Assert success
      cy.log(`Get All Awarding Bodies successfully.`);
      // Verify that the created student status is present in the response
      response.body.forEach((item) => {
        if (item?.name === createData?.name) {
          expect(item?.name).to.eq(createData?.name);
          expect(item?.description).to.eq(createData?.description);
          cy.wait(1000);
          // Click the "Edit" button to open the form
          awardingBodyPage.pageElements
            .editButton(item?.id)
            .first()
            .should("have.length", 1)
            .click();
          // Fill in the "Name" field with the value from the fixture
          cy.wait(1000);
          awardingBodyPage.formElements
            .name()
            .should("be.visible")
            .and("have.value", createData?.name)
            .clear()
            .type(updateData?.name, { delay: 50, force: true });
          // Fill in the "Start Date" field with the value from the fixture
          awardingBodyPage.formElements.accreditation_start_date
            .accreditation_start_date()
            .should("be.visible")
            .and("have.value", createData.accreditation_start_date);
          // RESET DATE
          awardingBodyPage.formElements.accreditation_start_date
            .resetDate()
            .click({ scrollBehavior: false });
          //
          const [
            accreditation_start_date_day,
            accreditation_start_date_month,
            accreditation_start_date_year,
          ] = updateData.accreditation_start_date.split("-");
          awardingBodyPage.formElements.accreditation_start_date
            .accreditation_start_date()
            .click({ scrollBehavior: false }); // Open date picker
          //  cy.scrollTo("top");
          awardingBodyPage.formElements.accreditation_start_date
            .openYearComponent()
            .click({ scrollBehavior: false }); // Navigate to year selection
          navigateToYear({ targetYear: Number(accreditation_start_date_year) }); // Select the correct year
          awardingBodyPage.formElements.accreditation_start_date
            .openMonthComponent()
            .click({ scrollBehavior: false }); // Open month selection
          selectMonth({ targetMonth: Number(accreditation_start_date_month) }); // Select the correct month
          selectDays({ day: Number(accreditation_start_date_day) }); // Select the correct day
          // Fill in the "Expiry Date" field with the value from the fixture
          awardingBodyPage.formElements.accreditation_expiry_date
            .accreditation_expiry_date()
            .should("be.visible")
            .and("have.value", createData.accreditation_expiry_date);
          // RESET DATE
          awardingBodyPage.formElements.accreditation_expiry_date
            .resetDate()
            .click({ scrollBehavior: false });
          const [
            accreditation_expiry_date_day,
            accreditation_expiry_date_month,
            accreditation_expiry_date_year,
          ] = updateData.accreditation_expiry_date.split("-");
          awardingBodyPage.formElements.accreditation_expiry_date
            .accreditation_expiry_date()
            .click({ scrollBehavior: false }); // Open date picker
          //  cy.scrollTo("top");
          awardingBodyPage.formElements.accreditation_expiry_date
            .openYearComponent()
            .click({ scrollBehavior: false }); // Navigate to year selection
          navigateToYear({
            targetYear: Number(accreditation_expiry_date_year),
          }); // Select the correct year
          awardingBodyPage.formElements.accreditation_expiry_date
            .openMonthComponent()
            .click({ scrollBehavior: false }); // Open month selection
          selectMonth({ targetMonth: Number(accreditation_expiry_date_month) }); // Select the correct month
          selectDays({ day: Number(accreditation_expiry_date_day) }); // Select the correct day
          // Fill in the "Description" field with the value from the fixture
          // We need to remove the "disabled" attribute from the field first
          // because Cypress doesn't allow typing into a disabled field
          awardingBodyPage.formElements
            .description()
            .should("be.visible")
            .and("have.value", createData?.description)
            .clear({ force: true })
            .invoke("removeAttr", "disabled")
            .type(updateData?.description, { delay: 50 });
          // Click the "Create Application Status" button to submit the form
          awardingBodyPage.formElements
            .submitButton()
            .should("be.visible")
            .and("have.text", "Update Awarding Body")
            .click();
          //
          cy.wait(2000);
          // Click the "Edit" button to open the form
          awardingBodyPage.pageElements
            .deleteButton(item?.id)
            .first()
            .should("have.length", 1)
            .click({ multiple: true, force: true });
          //
          cy.wait(1000);
          awardingBodyPage.pageElements
            .deleteConfirmationButton()
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
