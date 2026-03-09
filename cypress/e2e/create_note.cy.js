describe('Tests de la fonctionnalité création de note', () => {

  // Exécuter avant chaque test
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/notes/app/login')

    cy.fixture('users_notes').then((users) => {
      const email = users.valideUser.username;
      const password = users.valideUser.password;
      cy.loginNotes(email, password);
    });
  });


   it.only('Test de création de note avec succès', () => {
    // création d'une note
    cy.url().should('include', 'notes/app');
    cy.get('[data-testid="add-new-note"]').click();
    cy.get('[data-testid="note-category"]').select('Home');
    cy.get('[data-testid="note-completed"]').click();
    cy.get('[data-testid="note-title"]').type('Evaluation 1');
    cy.get('[data-testid="note-description"]').type('Description de l Evaluation 1');
    cy.get('[data-testid="note-submit"]').click();  // Soumettre le formulaire de création de note

    cy.get('[data-testid="category-all"]').click();  // Afficher toutes les notes
    cy.contains('Evaluation 1').should('exist');  // vérifier que le titre de la note créée est visible dans la liste des notes

    cy.get('[data-testid="category-home"]').click();  // Filtrer par catégorie "Home"
    cy.contains('Evaluation 1').should('exist');  // vérifier que la note créée est visible dans la catégorie "Home"

    cy.get('[data-testid="toggle-note-switch"]').eq(0).should('have.css', 'background-color', 'rgb(0, 0, 255)');  // Vérifier couleur de fond du ch amp "completed" (bleu pour les notes complétées)
   })

})