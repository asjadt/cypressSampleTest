// Utility to select a month
export const selectMonth = ({ targetMonth }) => {
    cy.get("[data-auto='month_list'] button") // Select all visible months
        .then(($monthButtons) => {
        if (targetMonth >= 0 && targetMonth <= 12) {
            cy.wrap($monthButtons[targetMonth - 1]).click({
                force: true,
                scrollBehavior: false,
            });
        }
        else {
            throw new Error(`Invalid month: ${targetMonth}`);
        }
    });
};
