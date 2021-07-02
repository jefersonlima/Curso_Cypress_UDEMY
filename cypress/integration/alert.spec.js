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

    it.only('Alert com Mock...', () =>{
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert',stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
        
    })

})