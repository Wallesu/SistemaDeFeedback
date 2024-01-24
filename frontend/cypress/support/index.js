import './commands';

beforeEach(() => {
  cy.fixture('auth').then(auth => {
    const { username, password } = auth;
    cy.LoginRequest(username, password);
  });
});
