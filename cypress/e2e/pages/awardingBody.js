class AwardingBodyPage {
    // Page elements for interacting with the awarding body page
    pageElements = {
        menuToggleButton: () => cy.get(`[data-auto="side_menu_toggle_button"]`),
        searchButton: () => cy.get(`[data-auto="awarding_body_search"]`),
        createButton: () => cy.get(`[data-auto="awarding_body_create"]`),
        editButton: (id) => cy.get(`[data-auto="awarding_body_edit-${id}"]`),
        deleteButton: (id) => cy.get(`[data-auto="awarding_body_delete-${id}"]`),
        deleteConfirmationButton: () => cy.get(`[data-auto="delete_confirmation_button"]`),
        swalOkButton: () => cy.get(".swal2-confirm"),
    };
    // Form elements for interacting with the awarding body form
    formElements = {
        name: () => cy.get(`[data-auto="name"]`),
        description: () => cy.get(`[data-auto="description"]`),
        awarding_body_logo: () => cy.get(`[data-auto="awarding_body_logo"]`),
        accreditation_start_date: {
            accreditation_start_date: () => cy.get('[data-auto="accreditation_start_date"]'),
            openDatePicker: () => cy.get(`[data-auto="accreditation_start_date-date_picker_wrapper"]`),
            openYearComponent: () => cy.get(`[data-auto="select_year"]`),
            selectYear: () => cy.get(`[data-auto="select_year"]`),
            openMonthComponent: () => cy.get(`[data-auto="select_month"]`),
            selectMonth: () => cy.get(`[data-auto="select_month"]`),
            selectDate: () => cy.get('[data-auto="accreditation_start_date"]'),
            resetDate: () => cy.get('[data-auto="accreditation_start_date-date_picker_reset"]'),
        },
        accreditation_expiry_date: {
            openDatePicker: () => cy.get(`[data-auto="accreditation_expiry_date-date_picker_wrapper"]`),
            openYearComponent: () => cy.get(`[data-auto="select_year"]`),
            selectYear: () => cy.get(`[data-auto="select_year"]`),
            openMonthComponent: () => cy.get(`[data-auto="select_month"]`),
            selectMonth: () => cy.get(`[data-auto="select_month"]`),
            selectDate: () => cy.get('[data-auto="accreditation_expiry_date"]'),
            accreditation_expiry_date: () => cy.get('[data-auto="accreditation_expiry_date"]'),
            resetDate: () => cy.get('[data-auto="accreditation_expiry_date-date_picker_reset"]'),
        },
        cancelButton: () => cy.get(`[data-auto="cancel_button"]`),
        submitButton: () => cy.get(`[data-auto="submit_button"]`),
    };
}
export const awardingBodyPage = new AwardingBodyPage();
