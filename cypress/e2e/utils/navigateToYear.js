export const navigateToYear = ({ targetYear }) => {
    cy.get("[data-auto='year_list'] button") // Select all visible years
        .then(($yearButtons) => {
        const yearTexts = $yearButtons
            .map((_, el) => parseInt(el.innerText))
            .get();
        // cy.log({yearTexts});
        const firstYear = Math.min(...yearTexts);
        const lastYear = Math.max(...yearTexts);
        if (yearTexts.includes(Number(targetYear))) {
            // Year exists in the current range, click it
            cy.contains("[data-auto='year_list'] button", Number(targetYear)).click({ scrollBehavior: false });
        }
        else if (Number(targetYear) < firstYear) {
            // If target year is less, trigger the previous button click event
            cy.get("[data-auto='prev_year']")
                .should("be.visible")
                .then(($prevBtn) => {
                if (!$prevBtn.prop("disabled")) {
                    // Trigger click explicitly via jQuery for custom handlers
                    cy.wrap($prevBtn).trigger("click", { scrollBehavior: false });
                    navigateToYear({ targetYear }); // Recursive call
                }
                else {
                    throw new Error("Previous button is disabled.");
                }
            });
        }
        else if (Number(targetYear) > lastYear) {
            // If target year is greater, trigger the next button click event
            cy.get("[data-auto='next_year']")
                .should("be.visible")
                .then(($nextBtn) => {
                if (!$nextBtn.prop("disabled")) {
                    // Trigger click explicitly via jQuery for custom handlers
                    cy.wrap($nextBtn).trigger("click", { scrollBehavior: false });
                    navigateToYear({ targetYear }); // Recursive call
                }
                else {
                    throw new Error("Next button is disabled.");
                }
            });
            navigateToYear({ targetYear }); // Recursive call
        }
        else {
            throw new Error(`Unable to navigate to year ${Number(targetYear)}`);
        }
    });
};
