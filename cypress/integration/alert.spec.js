/// <reference types="cypress" />

describe('Work with basic elements', () => {
    //vai execultar uma vez antes de todos os testes
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //vai executar uma vez antes de cada teste.
    beforeEach(() => {
        cy.reload()
    })

    it('Alert...', () =>{
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com Mock...', () =>{
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert',stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
        
    })

    it('Confirm...', () =>{
        cy.on('window:confirm', msg => {
            //console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.on('window:alert', msg => {
            //console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })

        cy.get('#confirm').click()
    })

    it.only('Deny...', () =>{
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        
        cy.get('#confirm').click()
    })

})