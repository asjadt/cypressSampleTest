import "cypress-mochawesome-reporter/register";

it("should navigate to Google and verify the page title", () => {
  cy.visit("https://www.google.com");
  cy.screenshot("navigated-to-google");

  cy.title().should("eq", "Google is not");
  cy.screenshot("verified-title");
});
