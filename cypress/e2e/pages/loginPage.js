class LoginPage {

  visit() {
    cy.visit('/auth/login');
  }

  get emailInput() {
    return cy.get('[name="username"]');
  }

  get passwordInput() {
    return cy.get('[name="password"]');
  }

  get submitButton() {
    return cy.get('.oxd-form-actions.orangehrm-login-action').find('button').contains('Login');
  }

  get motLogin() {
    return cy.get('.oxd-form-actions.orangehrm-login-action').find('button');
  }

  verifErrorMessageForInvalidCredentials() {
    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text').contains('Invalid credentials').should('be.visible');
  }

  verifErrorMessageForMissingFields() {
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').contains('Required').should('be.visible');
  }

    login(username, password) {
    this.emailInput.type(username);
    if (password) {            // Vérifie si le mot de passe est fourni avant de le taper
      this.passwordInput.type(password);
    }
    this.submitButton.click();
  }
}

export default new LoginPage();  