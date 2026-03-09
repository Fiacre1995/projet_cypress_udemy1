describe('Teste api sur la création de compte', () => {

    const apiUrl = 'https://practice.expandtesting.com/notes/api/users/register';

  it('Création dun compte utilisateur avec succes', () => {

const uniqueEmail = `user_${Date.now()}@gmail.com`;

    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        email: uniqueEmail,
        name: 'test user',
        password: '12345678'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'User account created successfully');  // Vérifie le message de succès
      expect(response.body.data).to.have.property('name', 'test user');
      expect(response.body.data.email).to.eq(uniqueEmail);
    });

  });

  

  it('Création de compte avec email déjà utilisé', () => {

const emailExist = 'yesyes@gmail.com';

    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        email: emailExist,
        name: 'test user',
        password: '12345678'
      },
      failOnStatusCode: false  // Empêche Cypress de échouer automatiquement sur les codes d'erreur
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.have.property('success', false);  // Vérifie le status de succès
      expect(response.body.message).to.eq('An account already exists with the same email address');
    });

  });

})