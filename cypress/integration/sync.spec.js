describe('Esperas... ', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    
    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')

        cy.get('#buttonDelay').click()

        cy.get('#novoCampo').should('not.exist')

        cy.get('#novoCampo').should('exist')
        
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve Fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            //.should('not.exist')
            .should('exist')
            .type('Funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')
        
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do find DOM', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')
        
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do tumeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

        // cy.get('#buttonListDOM').click()
        // //cy.wait(5000) // evitar usar wait
        // cy.get('#lista li span', { timeout: 30000 }) //preferir usar o timeout ao invés do wait
        //     .should('contain','Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span') //preferir usar o timeout ao invés do wait
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
        
    })

    it.only('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })
    
})