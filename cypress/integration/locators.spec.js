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

    it(' ', () => {
        
    })

})