it('nada agora', function () {})

//1º
//funcao basica
// function soma(a, b){
//     return a + b
// }

//2º
// const soma = function (a,b){
//     return a + b
// }

//3º
//arrow function
//  const soma = (a, b) => {
//      return a + b
//  }

//4º
//arrow function reduzida
//const soma = (a, b) => a + b

//5º caso use o "arrow" e logo depois abra uma chave é obrigatorio o "return"
// caso não tenha "return" vai retornar "undefined"
// const soma = (a, b) => { 
//     a + b
// }

//6º 
//const soma = (a) => a + a
//quando é passado somente um elemento não é necessario o parentes
//const soma = a => a + a

//7º quando não passa nenhum valor ou mais de 1 paramentro é obrigatorio o uso dos parentes
const soma = () => 5 + 5

console.log(soma(1,4))

it('a function test...', function () {
    console.log('Function', this)
})

it('an arrow test...', ()  => {
    console.log('Arrow', this)
})