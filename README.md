# Curso_Cypress_UDEMY
Curso de Teste funcionais, Testes de Backend e Testes de Frontend.

# Configurando Ambiente
## para gerenciar o projeto pelo npm
- npm init -y

## instalar dependencia LINT serve para deixar o codigo padronizado
- npm install eslint --save-dev

criar o arquivo .gitignore para a pasta node_modules

### documentacao LINT
https://eslint.org/docs/user-guide/getting-started

## instalação e criação configuração inicial do LINT
- node_modules/.bin/eslint --init
### instalacao
How would you like to use ESLint?

=>To check syntax, find problems, and enforce code style

What type of modules does your project use?

=>None of these

Which framework does your project use?

=>None of these

Does your project use TypeScript?

=>No

Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)

=>Browser

How would you like to define a style for your project?

=>Use a popular style guide

Which style guide do you want to follow?

=>Google: https://github.com/google/eslint-config-google

What format do you want your config file to be in?

=>JSON

Would you like to install them now with npm?

=>Yes

## para analizar o arquivo ou diretorio

node_modules/.bin/eslint index.js

node_modules/.bin/eslint nomeDiretorio/**
## para corrigir algum erro automaticamente.

node_modules/.bin/eslint index.js --fix

node_modules/.bin/eslint nomeDiretorio/**  --fix

## instalar o plugin ESLint

para mostrar os erro enquanto está codando.

## para alterar alguma regra.

=>abrir o arquivo .eslintrc.json e desativar lá as regras.

# instalar Cypress

versão usada no curso

- npm install cypress@3.6.0

versão mais atual
- npm install cypress 

## abrir Cypress

ir no arquivo package.json

no script adicionar

=>"cypress:open": "cypress open"

rodar no terminal

- npm run cypress:open

documentação Cypress
https://docs.cypress.io/guides/overview/why-cypress

# Instalando Plugins cypress-xpath

- npm install  cypress-xpath

no arquivo support/index.js apos o import './commands' coloque

- require('cypress-xpath')

documentacao xpath

https://www.red-gate.com/simple-talk/development/dotnet-development/xpath-css-dom-and-selenium-the-rosetta-stone/


# pronto para iniciar a codar.
