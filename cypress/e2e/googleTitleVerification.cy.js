describe("Google Page Title Verification", () => {
  it("should navigate to Google and verify the page title", () => {
    // Navigate to Google
    cy.visit("https://www.google.com");

    // Verify the page title
    cy.title().should("eq", "Google");
  });
});
