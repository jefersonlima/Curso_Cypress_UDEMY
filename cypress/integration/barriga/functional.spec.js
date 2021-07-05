/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.login('jefersonlimadesouza@hotmail.com.br', '11080822')
        cy.resetApp()
        cy.wait(2000)
    })
    
    it('Should create an acount', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta test create')
 
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    }) 

    it('Alter acount', () => {
        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta test create')).click()
 
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

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta test create')
        cy.get(loc.MOVIMENTACAO.STATUS).click()

        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)

        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc','123'))
            .should('exist')
    })

    it('Should get balance', () => {
        console.log(loc.SALDO.FN_XP_SALDO_CONTA('Conta test create'))
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta test create')).should('contain', '123')
    })

    it('should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Desc')).click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

})
