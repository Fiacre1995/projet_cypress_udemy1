describe('Description ensemble de test', () => {

  // Exécuter avant chaque test
  beforeEach(() => {
    cy.visit('/auth/login')
  });

  it('description du test', () => {
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').contains('Login').should('be.visible');
    cy.get('.oxd-text.oxd-text--p').eq(0).should("contain", "Username : Admin");

    // Sélecteur de puis l'element parent
    cy.get('.oxd-form-actions.orangehrm-login-action').find('button').contains('Login').click();
    cy.url().should('include', '/auth/login');

  })

    it('Test qui s execute pas avec fonction : skip', () => {

  })

   it('Test qui s execute seul avec fonction : only', () => {

  })


})