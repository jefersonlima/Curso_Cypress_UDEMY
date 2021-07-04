/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.login('jefersonlimadesouza@hotmail.com.br', '11080822')
        cy.resetApp()
    })

    it('Should create an acount', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta test create')
 
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    }) 

    it('Alter acount', () => {
        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
 
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta test create')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta test create')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

})
