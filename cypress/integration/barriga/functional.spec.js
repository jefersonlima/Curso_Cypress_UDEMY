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

    it('Should create an acount', () => {
        cy.get('[data-test=menu-settings] > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Conta test create')
        cy.get('.btn').click()
        //cy.get('.toast-success > .toast-message').should('exist')
        cy.get('.toast-success > .toast-message').should('contain', 'Conta inserida com sucesso')
    }) 

    it('Alter acount', () => {
        cy.get('[data-test=menu-settings] > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(., 'Conta test create')]/..//i[@class='far fa-edit']")
            .click()
 
        cy.get('[data-test=nome]')
        .clear()
        .type('Acount test create')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
    })

})
