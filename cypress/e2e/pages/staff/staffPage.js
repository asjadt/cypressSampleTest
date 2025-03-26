class StaffPage {
  pageElements = {
    menuToggleButton: () => cy.get(`[data-auto="side_menu_toggle_button"]`),
    searchButton: () => cy.get(`[data-auto="staff_search"]`),
    createButton: () => cy.get(`[data-auto="staff_create"]`),
    editButton: (id) => cy.get(`[data-auto="staff_edit-${id}"]`),
    deleteButton: (id) => cy.get(`[data-auto="staff_delete-${id}"]`),
    deleteConfirmationButton: () =>
      cy.get(`[data-auto="delete_confirmation_button"]`),
    swalOkButton: () => cy.get(".swal2-confirm"),
  };
  //
  formElements = {
    first_Name: () => cy.get(`[data-auto="first_Name"]`),
    last_Name: () => cy.get(`[data-auto="last_Name"]`),
    email: () => cy.get(`[data-auto="email"]`),
    phone: () => cy.get(`[data-auto="phone"]`),
    address_line_1: () => cy.get(`[data-auto="address_line_1"]`),
    country: () => cy.get(`[data-auto="country"]`),
    city: () => cy.get(`[data-auto="city"]`),
    postcode: () => cy.get(`[data-auto="postcode"]`),
    role: {
      select: () => cy.get('[data-auto="role-wrapper"]'),
      options: () => cy.get('[data-auto="role-options-container"]'),
    },
    cancelButton: () => cy.get(`[data-auto="cancel_button"]`),
    submitButton: () => cy.get(`[data-auto="submit_button"]`),
  };
}
export const staffPage = new StaffPage();
