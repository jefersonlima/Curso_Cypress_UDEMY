/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'Usuario falso',
                token: 'Uma string muito grande que nao deveria ser aceito mas vai'
            }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta: "Carteira",
                saldo: "100.00"
            },
            {
                conta_id: 9909,
                conta: "Banco",
                saldo: "10000000.00"
            }
            ]
        }).as('saldo')

        cy.login('jefersonlimadesouza@hotmail.com.br', 'senha errada')
        cy.wait(1000)
    })
    
    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })


    
    it('Should create an acount', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta test create')
 
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    }) 

    it('Alter acount', () => {
        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
 
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta para alterar')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc','123'))
        .should('exist')
    })
    
    it.only('Should get balance', () => {
        cy.resetApp()
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
        
        cy.get(loc.MENU.EXTRATO).click()
        
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        //Colocado esse wait prq estava execultando meuito rapido e não dava tempo de pegar o retorno
        cy.wait(1000)
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
        
    })

    it('should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao'))
            .click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

})
