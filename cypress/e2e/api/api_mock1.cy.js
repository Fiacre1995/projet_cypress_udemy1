describe('Tests de la fonctionnalité création de note', () => {

  // Exécuter avant chaque test
  beforeEach(() => {
    cy.intercept('GET', 'https://practice.expandtesting.com/notes/api/notes').as('listeNotes');  // Interception de la requête pour lister les notes
    
    cy.visit('https://practice.expandtesting.com/notes/app/login')

    cy.fixture('users_notes').then((users) => {
      const email = users.valideUser.username;
      const password = users.valideUser.password;
      cy.loginNotes(email, password);
    });
  });


   it.only('Vérification de la liste des notes avec les alias', () => {

    // Assertion pour vérifier que la requête pour lister les notes a été interceptée et que la réponse est correcte
    cy.wait('@listeNotes').then((listeNotes) => {    
        expect(listeNotes.response.statusCode).to.eq(200);
        expect(listeNotes.response.body.data).to.be.an('array');  // Vérifie que les données sont un tableau de notes
    });  // Attendre que la requête pour lister les notes soit interceptée et vérifier la réponse

  })

})