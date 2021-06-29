/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        // TODO imprimir o log no console
        // TODO esvrever o log em um campo de texto
    })

    it.only('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        //cy.get('nao existe')
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')

        expect
    })
    
})


