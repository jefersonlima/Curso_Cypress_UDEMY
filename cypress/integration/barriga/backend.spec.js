/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {

    })
    
    beforeEach(() => {
        
    })
    
    it('Should create an acount', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "jefersonlimadesouza@hotmail.com.br",
                redirecionar: false,
                senha: "11080822"
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
                cy.request({
                    url: 'https://barrigarest.wcaquino.me/contas',
                    method: 'POST',
                    headers: { Authorization: `JWT ${token}`},
                    //headers: { Authorization: `bearer ${token}`},//novas versoes
                    body: {
                       nome: "Conta via rest" 
                    }
                }).as('response')
            })
        
            cy.get('@response'). then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', 'Conta via rest')
            })
    }) 

    it('Alter acount', () => {
        
    })

    it('Should not create an account with same name', () => {
        
    })

    it('Should create a transaction', () => {
        
    })
    
    it('Should get balance', () => {
        
    })

    it('should remove a transaction', () => {
        
    })

})
