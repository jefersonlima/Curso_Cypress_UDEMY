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
