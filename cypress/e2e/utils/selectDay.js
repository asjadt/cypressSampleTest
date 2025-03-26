export const selectDays = ({ day }) => {
    cy.get("[data-auto='days']") // Select all visible days
        .then(($dayButtons) => {
        // Convert inner text to integer and compare
        const dayTexts = $dayButtons
            .map((_, el) => parseInt(el.innerText, 10))
            .get();
        // Remove leading zero if day is provided as a string (e.g., "01" becomes 1)
        const formattedDay = day < 10 ? parseInt(day.toString()) : day; // Ensure day is formatted correctly without leading zeros
        if (dayTexts.includes(formattedDay)) {
            // Find the button with the correct day and click it
            cy.contains("[data-auto='days']", formattedDay).click({
                scrollBehavior: false,
            });
        }
        else {
            throw new Error(`Invalid day: ${formattedDay}`);
        }
    });
};
