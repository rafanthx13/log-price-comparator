const config = require('./knexfile.js')
const knex = require('knex')

// posos especificar varios bancos
module.exports = knex(config.dev)

/*

const knex = require('knex');
const knexfile = require('../knexfile');

// nkex-logger pertime printar e recuperar as consultas SQL feitas
// const knexlogger = require('knex-logger');

// app.use(knexlogger(app.db));

// onde fizer app.db, eu ja vou ter referencia ao banco de dados
app.db = knex(knexfile.test);

*/