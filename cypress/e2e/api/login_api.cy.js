describe('Teste api sur la création de compte', () => {

    const apiUrl = 'https://practice.expandtesting.com/notes/api/users/login';
    let token;  // Variable pour stocker le token d'authentification

    beforeEach(() => {
        
        const emailExist = 'yesyes@gmail.com';

        cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
            email: emailExist,
            password: '12345678'
        }
        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Login successful');  // Vérifie le message de succès
        
        token = response.body.data.token;  // Récupère le token d'authentification
        expect(token).to.not.be.empty;  // Vérifie que le token n'est pas vide
        });

    });

    it.only('test permettant de lister les notes', () => {

        cy.request({
            method: 'GET',
            url: 'https://practice.expandtesting.com/notes/api/notes',
            headers: {
                'x-auth-token': token  // Utilise le token d'authentification dans les en-têtes de la requête
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');  // Vérifie que les données sont un tableau de notes
        });

    });

})