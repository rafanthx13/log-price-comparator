# App Bac-End Vue.js - Knowledge

**NÂO ESTÁ FUNCIONAND, MAS ESTÁ COMENTADO PARA ENTENDER**

falta completar as outras mas já nâo importa mais

## Knex

É um queryBuilder.

Pra instalar globalmente ...
`sudo npm i -g knex`

no dir one está knex file, vocÊ pode criar migartions com o seguinte comando

`knex migrate:make create_table_articles`

para criar a pasta migrations e tambem as migratios

depois há outro comando para executar

`knex migrate:latest` : executa até a ultima migration

`knex migrate:rollback`: volta uma migration

`knex migrate:rollback --all`: volta tudo

Em MySQL as migrations que tiverem FK devem ser asism para funcionar. Senâo dá error

````
table.integer('parentId', 10)
      		.unsigned()
          .notNullable()
          .references('id')
          .inTable('categories')
````


## Cors

É necessário pois bakcEnd e frontENd são duas aplicações distintas.

O cors permite que de outra origem (localhost:outra_porta ou de outra url) possa acessar a nossa aplicação

## Consign

Ajuda a organizar as dependencias da nossa aplicação, além dos arquivos

Ele evita ter vários `import` do JS. Colocando parte dele no objeto principla (o app. aplicaçâo express)

Tudo que é carregado pelo consgins tem que ser exportado de uma forma especifica

**OBS: A ORDEM DO CORS importa**

````javascript

````

Arquivo central
````javascript
//index.js
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)
````
MiddleWares

````javascript
// config/middlewares.js
const bodyParser = require('body-parser') 
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}
````

Obsserve esse validation.js
````javascript
// validation.js
module.exports = app => {
    
  function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
  }
  
  function notExistsOrError(value, msg) {
    try {
        existsOrError(value, msg)
    } catch(msg) {
        return
    }
    throw msg
  }
  
  function equalsOrError(valueA, valueB, msg) {
    if(valueA !== valueB) throw msg
  }

  return { existsOrError, notExistsOrError, equalsOrError }
}
````

Agora observe como esse validation é chamado em outro lugar. `app.api.validation` pois está na pasta `api/validation`
````javascript
// user.js
module.exports = app => {

	// Vem diretamente de validation.js, através do consgins
	const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

}
````

