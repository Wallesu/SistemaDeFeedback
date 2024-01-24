Cypress.Commands.add('HomePage', () => {
  cy.visit(Cypress.config('baseUrl'));
});
