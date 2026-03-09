describe('Tests de la fonctionnalité création de note', () => {

  // Exécuter avant chaque test
  beforeEach(() => {

    cy.intercept('GET', 'https://practice.expandtesting.com/notes/api/notes',
    {
        data: [],
    }
    ).as('mockListeNotes'); // Interception de la requête pour lister les notes
    
    cy.visit('https://practice.expandtesting.com/notes/app/login')

    cy.fixture('users_notes').then((users) => {
      const email = users.valideUser.username;
      const password = users.valideUser.password;
      cy.loginNotes(email, password);
    });
  });

  it.only('Mocker la liste des notes', () => {

        // Assertion pour vérifier que la requête pour lister les notes a été interceptée et que la réponse est correcte
        cy.wait('@mockListeNotes').then((mockListeNotes) => {    
            expect(mockListeNotes.response.statusCode).to.eq(200);
            expect(mockListeNotes.response.body.data).to.be.an('array');  // Vérifie que les données sont un tableau de notes
        });  // Attendre que la requête pour lister les notes soit interceptée et vérifier la réponse

    })

})