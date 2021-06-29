/// <reference types="cypress" />
// "it" cria um unico teste
// "describe" cria um grupo de teste inclusive outros grupos de testes
// "skip" faz com que um determinado teste não seja executado pode ser aplicado em um grupo de teste
// "only" roda apenas um teste caso exista mais de um only será executado somente o ultimo

it.only('A external test...', () => {

})

describe.skip('Shold group tests...', () => {
    describe('Should group more specific tests...', () => {
        it.skip('A external test...', () => {

        })
    })

    describe('Should group more specific tests2...', () => {
        it('A external test...', () => {

        })
    })

    it('A external test...', () => {

    })
})