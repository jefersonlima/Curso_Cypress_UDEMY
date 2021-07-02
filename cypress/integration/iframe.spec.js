/// <reference types="cypress" />

describe('Work with Iframe', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //vai executar uma vez antes de cada teste.
    beforeEach(() => {
        cy.reload()
    })

    it('Deve preencher o campo de texto', () => {
        cy.get('#frame1')
            .then(iframe => {
                const body = iframe.contents().find('body')

                cy.wrap(body).find('#tfield')
                    .type('Funciona?')
                    .should('have.value', 'Funciona?')
            })
    })

    it('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
    
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
})