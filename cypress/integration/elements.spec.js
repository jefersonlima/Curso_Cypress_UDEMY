/// <reference types="cypress" />

describe('Work with basic elements', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //vai executar uma vez antes de cada teste.
    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        //cy.get('body').should('have.text', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        //cy.get('div').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('not.have.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })
})