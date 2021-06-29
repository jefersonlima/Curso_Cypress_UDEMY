it('sem testes, ainda', () => {})

//const getSomething = () => 10;
//1º
// const getSomething = () => {
//     setTimeout(() => {
//         console.log('respondendo...')
//         return 11;
//     }, 1000)
// }

// const system = () => {
//     console.log('init');
//     const something = getSomething();
//     console.log(`Something is ${something}`);
//     //console.log("Something is " + something); //outra forma de interpolar antigo
//     console.log('end')
// }

//2º
// const getSomething = callback => {
//     setTimeout(() => {
//         callback(12);
//     }, 1000)
// }

// const system = () => {
//     console.log('init');
//     getSomething(some => console.log(`Something is ${some}`));
//     console.log('end')
// }

//3º
// const getSomething = callback => {
//     setTimeout(() => {
//         callback(12);
//     }, 5000)
// }

// const system = () => {
//     console.log('init');
//     getSomething(some => {
//         console.log(`Something is ${some}`)
//         console.log('end');
//     })
// }

//4º promisses
// const getSomething = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(13);
//         }, 1000)
//     })
// }

// const system = () => {
//     console.log('init');
//     const prom = getSomething();
//     prom.then(some => {
//         console.log(`Something is ${some}`)
//     })
//     console.log('end')
// }

//5º simplificando mais
// const getSomething = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(13);
//         }, 1000)
//     })
// }

// const system = () => {
//     console.log('init');
//     getSomething().then(some => {
//         console.log(`Something is ${some}`)
//     })
//     console.log('end')
// }

//6º
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

const system = async () => {
    console.log('init');
    const some = await getSomething()
    console.log(`Something is ${some}`)
    console.log('end')
}

system();