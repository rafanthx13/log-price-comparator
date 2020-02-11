# App Comparatorator - DEscriço de cada etapa

## 01. Vue CLI

### Pra que serve

link do site oficial: <https://cli.vuejs.org/>

Se fala \viu cialai\

O Vue cli oferece uma boa forma de iniciar um projeto em vue já vindo com um webServer. Os benefícios são:

+ autoreload
+ build de desenvolvimento e produçâo
+ organização das pastas
+ Ambiente de Dev e Build configurados
+ Compila componente em um único arquivo
+ pré-processadores (SASS)

### Instalando e Criando um Projeto

INstalar o Vue CLI globalmente
npm install -g @vue/cli

**Criando um projeto simples**

`vue create projeto-simples`

e depois selecione a opçâo default

Como meu PC é lento, vai demorar até está tudo concluido, mas deu tudo certo

Como mensagem final terá

$ cd projeto-simples
$ npm run serve

No final mostrara o endereço de acesso:

App running at:
  - Local:   http://localhost:8080/
  - Network: http://172.23.17.141:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

**OBS**: O vue por default vai subir na porta 8080, mas se já estiver sendo usada, ele vai subir o número, para talvez 8081. TOME CUIDADO COM ISSO.

### Estrutura do projeto do Vue CLI

````
projeto-simples/
	node_modules/
	public/
		favicon.ico
		index.html
	src/
		assets/
			logo.png
		components/
			HelloWorld.vue
		App.vue
		main.js
	.gitignore
	babel.config.js
	package-lock.json
	package.json
	REAME.md
````

+ `node_modules`: dependências do `node` para excutar tudo. Não é lançada no `git` pois pode ser refeita ao fazer `npm i` pelo `package.json`

+ `public`: Tem o HTML principla da SPA (Single Page Application)
  - Template inicial

+ `src/` Pasta em que haverá 95% do trabalho

  + `main.js`: importa o Vue. Cria e redereniza sua instância
  + `App.vue` : Arquivo de vue principal que vai importar os váriso componentes da pasta `components`.
     - É ele que está sendo renderizado na tela
  + `components/` poussui compontes, arquivos `.vue`


`npm run build`

Vai gerar a pasta `dist/` E rodar o processo de construção da pasta que será realmente exportada para produção

#### Vue UI

`vue ui` forma gráfica de ver o projeto, dependencia e plugins do vue; os plugins sâo coloados de forma diferente

abre no localhost:8080 uma GUI para gerenciar os plugins do VUe  

## PLugins

Vuetofy : COmponetne MaterialDesign para Vue

## Icons

Link de como usar com Vuetify : https://vuetifyjs.com/pt-BR/customization/icons

Usando MaterialDesignIcons. Link: https://cdn.materialdesignicons.com/2.0.46/
É necessário importar com npm, pois vem poucos itens e a maioria que vc quiser usar nao vai ter la com `npm install @mdi/font -D`