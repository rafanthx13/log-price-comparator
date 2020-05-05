# Knex Tips

## O que é Knex

Biblioteca para construir e gerencia o banco de dados

Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.

##  Migrations


Migrations allow for you to define sets of schema changes so upgrading a database is a breeze.

Ao criar uma nova tabela, a primeira coisa é fazer pelo knex. Ao fazer isso, vocÊ já da o comando direto para o BD (Postgres/MySQL) fazer isos em precisar criar o `CREATE TALBE` no WOrkBench

1 Passo: configurar onde fica as migartions

````
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  migrations: {
    tableName: 'migrations'
  }
});
````

`node_modules/.bin/knex migrate:make create_table_accounts --env test`


==> Vai criar arquivo de migrations  para o ambiente test

Vai criar um arquivo de migração
up: Progredir o banco, ou seja, o código da criaçâo da tabela
donw: REgredir o banco, voltar par aum estado anterior, no caso, destruir uma tabela

Aí vocÊ coloca 
````
exports.up = (knex) => {
  return knex.schema.createTable('accounts', tb => {
    tb.increments('id').primary();
    tb.string('name').notNull();
    tb.integer('user_id')
      .references('id')
      .inTable('users')
      .notNull();
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('accounts');
};
````
Para ativa, usae o comando

`node_modules/.bin/knex migrate:latest --env test`

para assim rodar até o ultimo arquivo em ordem de time_stamp (por isos nâo pdoe renomialos, pois usa o timestamp) para atualizar o banco

tabela de Tranferencias

`node_modules/.bin/knex migrate:make create_table_transfers --env test`



## lib `knex-logger`

`npm i -S knex-logger`

// nkex-logger pertime printar e recuperar as consultas SQL feitas
const knexlogger = require('knex-logger');

app.use(knexlogger(app.db));



**log manual**

// LogManual pelo Knex (mas dessa forma suja muito o console)
app.db.on('quey', (query) => {
	console.log({sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : ''  });
})
	.on('query-repsonse', response => console.log(response))
	.on('error', error => console.log(error));

## Vantagens do Knex

1. Se conecta com qualquer banco
2. o `UPDATE`em uma tabela recebe um onjeto, ai ele vai buscar pela chave desse objeto o que mudar, ou seja, é muito  mais fácil que criar uma consulta para cada possibildiade de update.
  Exempl:
  ````
  // Atualizo buscando pelo ID, mas o que será atualizado deppdende do objeto 'transaction' cujas chaves saâo os campos e os valore o que deve ser sobrescrito na row
  const update = (transactionId, transaction) => {
        return app.db('transactions').where({id: transactionId}).update(transaction, '*');
    };
  ````

3. A busca do where é feito por objeto que nem o update

````
const find = (filter = {}) => {
      return app.db('transfers').where(filter).select();
    };
````

## Seed

`seed` é um recurso para popular uma tabela de dados. Uma outra forma seria criar um arquivo de `INSERT INTO` ou mesmo de XML ou `dump`.

O knex tem esse recusro, de vocÊ criar uma apsta para por seed e utilizála.

Primeiramente, para configurar seed vocÊ precisa especifica onde elas vão ficar em `knnexfile.js`

Depois disso usamos o comando para criar a seed. INseridno no knexfile fica

````javascript
module.exports = {

  test: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      database: 'barriga',
    },
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds'
    }
  }

};
````

Apos isso, vocÊ pode criar arquviso de sedd com o comando abaixo

`node_modules/.bin/knex seed:make transfer --env test`

Isso vai criar o arquivo `tranfer.js` na pasta `src/seed` cujo codigo inicial sera:

````javascript
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

````
Rodar seeds

`node_modules/.bin/knex seed:run --env test`


## Migrations no MySQL

Quando for fazer uma FK nas migrations, deve-se colocar dois campos e nessa ordem `.unsigned().notNullable()`. 
Se você fizer no PostGres nâo precisa, mas isso é necessário no Mysql

````javacript
table.integer('parentId', 10)
      	  .unsigned()
          .notNullable()
          .references('id')
          .inTable('categories')
````

## Knex Com MySQL

É necessário o pacote `mysql` : `npm i mysql -S`

### Diferenças do PostGres

#### Insert

No **postGres** temos
````javascript
app.db('accounts').insert(account, '*')
````
retorna os dados que foram inseridos junto com o ID do auto-increment

No **Mysql**

Para fazer a mesma coisa temos que fazer ...

````javascript
return app.db('city').insert(city).then( id => {
	return { ...city, city_id : id[0] }
})
````

Pois no mysql o insert só pode voltar o máximo o ID, e com ele mais os parametrios do insert, podemos entâo retornar os dados como se fosse o do postgress

o 'id' tem que ser com `[0]` pois **retorna os ID dos dados inseridos**, você poderia inserirr mais de um que voltaria uma lista mairo, entâo é sempre uma lista

#### Update

No **postGres** temos

````javascript
app.db('accounts').where({ id }).update(account, '*');
````
Que retorna a row depois de atualizada.

Nâo tem como fazer dessa forma no MySQl, o que podemos fazer é

````javascript
return app.db('city').where({ city_id: id}).update(city)
	.then( isUpdate => {
		if(!isUpdate)
			throw new NotFoundError(`City Not Found`)
		else
			return { city_id: id, ...city }
	});
````

POis do Return só volta **0** ou **1** inidincado se a linha foi ou nâo ataulizada
Para retornar entâo, usamos os mesmos parametros de entrada

#### Delete

Parecido com o Update, volta 1/0 se conseguiu ou nâo deletear algo.

No caso, nâo há diferença entre eles

**PostGress**
````javascript
app.db('accounts').where({id}).del()
````

**MySql**
````javascript
return app.db('city').where({ city_id: id}).del()
	.then( wasDeleted => {
		if(!wasDeleted)
			throw new NotFoundError(`City Not Found`)
		return wasDeleted
	})
````
## Exemplo de knex file

````javascript
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, 
	DB_NAME } = require("../env/env.config.js");

module.exports = app = {

	dev: {
		client: 'mysql',
		connection: {
			host : DB_HOST,
	    port: DB_PORT,
	    database: DB_NAME,
	    user: DB_USER,
	    password: DB_PASS
		},
		pool: {
			min: 2,
			max: 10
		}

	}
	
};
````
