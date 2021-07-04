/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me')

        cy.get('.input-group > .form-control').type('jefersonlimadesouza@hotmail.com.br')
        cy.get(':nth-child(2) > .form-control').type('11080822')
        cy.get('.btn').click()

        //cy.get('.toast-message').should('exist')
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Login', () => {
        
    })

})
