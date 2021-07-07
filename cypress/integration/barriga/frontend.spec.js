/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    
    beforeEach(() => {
        buildEnv()
        cy.login('jefersonlimadesouza@hotmail.com.br', 'senha errada')
        cy.wait(1000)
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })

    
    it('Should create an acount', () => {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{
                id: 1,
                nome:"Carteira",
                visivel:true,
                usuario_id:1
            },
                {id:2,
                nome:"Banco",
                visivel:true,
                usuario_id:1
            }]
        }).as('contas')

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id:3,nome:"Conta de teste",visivel:true,usuario_id:1}
        }).as('SaveConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{
                id: 1,
                nome:"Carteira",
                visivel:true,
                usuario_id:1
            },
                {id:2,
                nome:"Banco",
                visivel:true,
                usuario_id:1
            },
                {id:3,
                nome:"Conta de testeo",
                visivel:true,
                usuario_id:1
            }]
        }).as('contasSave')
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    }) 

    it('Alter acount', () => {
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {
                id: 1,
                nome:"Conta para alterar",
                visivel:true,
                usuario_id:1
            }
        }).as('AlterarConta')

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta para alterar')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {"error":"Já existe uma conta com esse nome!"},
            status: 400
        }).as('SaveContaMesmoNome')
        
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {"id":626870,"descricao":"adfasdf","envolvido":"adfasd","observacao":null,"tipo":"REC","data_transacao":"2021-07-06T03:00:00.000Z","data_pagamento":"2021-07-06T03:00:00.000Z","valor":"232.00","status":false,"conta_id":676085,"usuario_id":22418,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: 'fixture:movimentacaoSalva'
        })
        
        cy.get(loc.MENU.MOVIMENTACAO).click();
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc','123'))
        .should('exist')
    })
    
    it('Should get balance', () => {
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 626873,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-07-06T03:00:00.000Z",
                "data_pagamento": "2021-07-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 676156,
                "usuario_id": 22418,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })
        
        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 626873,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-07-06T03:00:00.000Z",
                "data_pagamento": "2021-07-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 676156,
                "usuario_id": 22418,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })
        
        cy.resetApp()
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')
        
        cy.get(loc.MENU.EXTRATO).click()
        
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        //Colocado esse wait prq estava execultando meuito rapido e não dava tempo de pegar o retorno
        cy.wait(1000)

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta: "Carteira",
                saldo: "4034.00"
            },
            {
                conta_id: 9909,
                conta: "Banco",
                saldo: "10000000.00"
            }
            ]
        }).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
        
    })

    it('should remove a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')
        
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao'))
            .click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

})
