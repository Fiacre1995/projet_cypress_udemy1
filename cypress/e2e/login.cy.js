const { default: loginPage } = require("./pages/loginPage");

describe('Teste de la fonctionnalité de login avec les cas passants et négatifs', () => {

  // Exécuter avant chaque test
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('Test de login avec identifiants valides', () => {
    loginPage.emailInput.type('admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('.oxd-form-actions.orangehrm-login-action').find('button').contains('Login').click();
    cy.url().should('include', '/dashboard');
    cy.get('span').find('h6').contains('Dashboard').should('be.visible');
  })

   it('Test de login avec mot de passe incorrect', () => {
    cy.get('[name="username"]').type('admin');
    cy.get('[name="password"]').type('12345678');
    cy.get('.oxd-form-actions.orangehrm-login-action').find('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').contains('Invalid credentials').should('be.visible');
  })

  it('Test avec login et mot de passe vident', () => {
    cy.get('[name="username"]').clear();
    cy.get('[name="password"]').clear();
    cy.get('.oxd-form-actions.orangehrm-login-action').find('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').contains('Required').should('be.visible');
  })

   it('Test de Login avec commande personnalisée ', () => {
    cy.Login('admin', 'admin123');
    cy.url().should('include', '/dashboard');
    cy.get('span').find('h6').contains('Dashboard').should('be.visible');
  })

   it('Test de Login avec fixture ', () => {
    cy.fixture('users').then((users) => {
      const username = users.valideUser.username;
      const password = users.valideUser.password;
      cy.Login(username, password);
    });
    cy.url().should('include', '/dashboard');
    cy.get('span').find('h6').contains('Dashboard').should('be.visible');
  })

})