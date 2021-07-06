/// <reference types="cypress" />

import '../../support/commands'
describe('Should test at a functional level', () => {
    let token
    before(() => {
        cy.getToken('jefersonlimadesouza@hotmail.com.br', '11080822')
            .then(tkn => {
                token = tkn
            })
    })
    
    beforeEach(() => {
        cy.resetRest(token)
    })
    
    it('Should create an acount', () => {
        
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            //headers: { Authorization: `bearer ${token}`},//novas versoes
            body: {
                nome: "Conta via rest" 
            }
        }).as('response')
            
        
        cy.get('@response'). then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    }) 

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {

            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: "Conta alterada via rest"
                }
            }).as('response')
    
            cy.get('@response').its('status').should('be.equal', 200)
        })

        // .then(res => {
        //     expect(res.status).to.be.equal(201)
        // })
    })

    it('Should not create an account with same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            //headers: { Authorization: `bearer ${token}`},//novas versoes
            body: {
                nome: "Conta mesmo nome" 
            },
            failOnStatusCode: false
        }).as('response')
            
        
        cy.get('@response'). then(res => {
            //console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction', () => {
        
    })
    
    it('Should get balance', () => {
        
    })

    it('should remove a transaction', () => {
        
    })

})
