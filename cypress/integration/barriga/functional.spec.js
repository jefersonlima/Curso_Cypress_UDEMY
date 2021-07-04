/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Should test at a functional level', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.login('jefersonlimadesouza@hotmail.com.br', '11080822')
        cy.resetApp()
        // cy.visit('http://barrigareact.wcaquino.me')
        // cy.get(loc.LOGIN.USER).type('jefersonlimadesouza@hotmail.com.br')
        // cy.get(loc.LOGIN.PASSWORD).type('11080822')
        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // //cy.get('.toast-message').should('exist')
        // cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Should create an acount', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Conta test create')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        //cy.get('.toast-success > .toast-message').should('exist')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    }) 

    it('Alter acount', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
 
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta test create')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

})
