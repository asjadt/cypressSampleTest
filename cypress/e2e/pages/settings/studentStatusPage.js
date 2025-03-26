class StudentStatusPage {
    pageElements = {
        menuToggleButton: () => cy.get(`[data-auto="side_menu_toggle_button"]`),
        searchButton: () => cy.get('[data-auto="student_status_search"]'),
        createButton: () => cy.get('[data-auto="student_status_create"]'),
        editButton: (id) => cy.get(`[data-auto="student_status_edit-${id}"]`),
        deleteButton: (id) => cy.get(`[data-auto="student_status_delete-${id}"]`),
        deleteConfirmationButton: () => cy.get(`[data-auto="delete_confirmation_button"]`),
        swalOkButton: () => cy.get(".swal2-confirm"),
    };
    formElements = {
        name: () => cy.get('[data-auto="student_status_name"]'),
        description: () => cy.get('[data-auto="student_status_description"]'),
        cancelButton: () => cy.get('[data-auto="cancel_button"]'),
        submitButton: () => cy.get('[data-auto="submit_button"]'),
    };
}
export const studentStatusPage = new StudentStatusPage();
