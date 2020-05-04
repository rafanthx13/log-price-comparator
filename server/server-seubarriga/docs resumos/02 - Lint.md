### Lint

Como garantir uma padronização do código

`npm i eslint --save-dev` ou `-D`

Acessando e executando eslint. (Poderia por ele como global também)

`node_modules/.bin/eslint --init`

Executar sobre um arquivo

`node_modules/.bin/eslint index.js`

Conserta autmaticamente alguns detalhes mais chatos

`node_modules/.bin/eslint index.js --fix`

Para me notificar quando eu contrrio oeslint, posos baixar uma extensão `eslint` para o VS Code.

Eu também posso alterar as coisa no arquivo `.eslintrc.json`

````
"extends": "airbnb-base"
"rules"": {
	"no-console": "off"
}

````

VOcê pode usar comandos no `npm` para concserta `npm run lint` ou pela propria extensão do VSCOde
````
"lint": "eslint index.js src/** --fix"
````

# Projeto

## Instalando ESLINT

````
rhavel@rhavel-VPCEG13EB:~/Documentos/Personal Projects/web-study/node.js/Curso Udemy - Node TDD/seubarriga$ ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? No
? Where does your code run? Browser
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JSON
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1
? Would you like to install them now with npm? Yes


vai crirar `eslintrc.json`

**Como usar**

"lint": "eslint src/** test/** --fix"

executar `npm run lint`

**É RECOMENDADO USAR O ESLINT pois ele é um depurador de sintax. Se vcoe por exemplo, colocar um ccaminho errado, ele vai saber e te indicar, entauqnto que sem ele , vocÊ so saberia em execuçâo. É MUITO PRODUTIVO E EVITA ERROS BESTAS**
