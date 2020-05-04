// App com a aplicação

const app = require('express')();

/* consign é uma lib para organizar aplicações express
Com ele, você vai importar vários arquivos para o app do express
Dessa forma fica mais organizado, mas também poderia ser feito de
uma forma mais manual

O consign tambem obriga a ter uma estrutura nas funções que ele importa
*/
const consign = require('consign');

const knex = require('knex');
const knexfile = require('../knexfile');

// nkex-logger pertime printar e recuperar as consultas SQL feitas
// const knexlogger = require('knex-logger');

// app.use(knexlogger(app.db));

// onde fizer app.db, eu ja vou ter referencia ao banco de dados
app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/midllewares.js')
  .then('./services') // todos os serviços criados nessa pasta vao ser acoplados ao app
  .then('./routes') // Vai importar todos os arquivo dessa pasta
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

// app.post('/users', (req, res) => {
//   res.status(201).json(req.body);
// });

// LogManual pelo Knex (mas dessa forma suja muito o console)
// app.db.on('quey', (query) => {
// 	console.log({sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : ''  });
// })
// 	.on('query-repsonse', response => console.log(response))
// 	.on('error', error => console.log(error));

// LIstar aqui todos os erros
app.use( (err, req, res, next) => {
	const {name, message, stack} = err;
	if(name === 'ValidationError')
    // Ou seja, quando der error 400, é porque deu um erro de ValidationError
		res.status(400).json({ error: message})
  if(name === 'RecursoIndevidoError')
    res.status(403).json({ error: message})
	else 
    // Se der erro 505, quer dizer que algo ultra bizarro acoanteceu
  // console.log('name', name);
  // console.log('message', message);
  // console.log('stack', stack);
		res.status(505).json({name, message, stack});
	next();
})

// Eu exportei para meu teste pode utilizala como objeto de teste
module.exports = app;
