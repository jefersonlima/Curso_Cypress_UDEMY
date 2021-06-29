/// <reference types="cypress" />

describe('Equalitys', () => {
    it('Equality 1', () => {
    const a = 1;

    expect(a).equal(1);
    })

    it('Equality 2', () => {
    const a = 1;
    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b')
    //expect('a').to.be.equal('b')
    })

    it('Truthy', () => {
        const a = true;
        const b = null;
        let c;

        expect(a).to.be.true;
        expect(true).to.be.true;
        expect(b).to.be.null;
        expect(a).to.be.not.null;
        expect(c).to.be.undefined;
    })

    it('Object Equality', () => {
        const obj = {
            a: 1,
            b: 2
        }
        
        expect(obj).equal(obj) // verifica se ele é igual a ele mesmo
        expect(obj).equals(obj) // tambem da certo
        expect(obj).eq(obj)
        expect(obj).to.be.equal(obj)

        expect(obj).to.be.deep.equal({a: 1, b:2}) //para comparar as propriedade do objeto é necessario o "deep"
        expect(obj).eql({a: 1, b: 2}) // igual ao "deep" mas abreviado

        expect(obj).include({a: 1}) // verificar uma propriedade com seu valor
        expect(obj).to.have.property('b') //verificar somente a se no objeto exixte aquela propriedade
        expect(obj).to.have.property('b', 2) //verificar somente a se no objeto exixte aquela propriedade e seu valor
        
        expect(obj).to.be.not.empty //verificar se esta vazio
        expect({}).to.be.empty
    })

    it('Arrays', () => {
        const arr = [1, 2, 3]
        expect(arr).to.have.members([1, 2, 3]) //verifica se essas propriedades estão no array
        expect(arr).to.include.members([1, 3]) //verifica se alguns membros estao incluidos no array

        expect(arr).to.be.not.empty
        expect([]).to.be.empty
    })

    it('Types', () => {
        const num = 1
        const str = 'String'

        expect(num).to.be.a('number')
        expect(str).to.be.a('string')
        expect({}).to.be.an('object')
        expect([]).to.be.an('array')
    })

    it('String', () => {
        const str = 'String de teste'

        expect(str).to.be.equal('String de teste')
        expect(str).to.have.length(15)
        expect(str).to.contains('de')

        // jquery
        expect(str).to.match(/de/)
        expect(str).to.match(/^String/)
        expect(str).to.match(/teste$/)
        expect(str).to.match(/.{15}/)
        expect(str).to.match(/\w+/)
        expect(str).to.match(/\D+/)
    })

    it('Numbers', () => {
        const number = 4
        const floatNumber = 5.2123

        expect(number).to.be.equal(4)
        expect(number).to.be.above(3) //acima
        expect(number).to.be.below(7) //abaixo

        expect(floatNumber).to.be.equal(5.2123)
        expect(floatNumber).to.be.closeTo(5.2, 0.1) 
        expect(floatNumber).to.be.above(3) //acima

    })

})
