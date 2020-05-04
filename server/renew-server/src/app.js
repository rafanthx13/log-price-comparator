const app = require('express')();
const consign = require('consign');
const db = require('./db/connection.js');

app.db = db; 

// a ordem faz diferença
// use verbose : true para debugar chamadas de arquivos do cosign
consign({  cwd: 'src', verbose: false })
	.include('./config/middlewares.js')
	.then('./env/env.config.js')
	// jest só funciona sem swagger
	// .then('./config/swagger.js')
	.then('./errors')
	.then('./services')
	.then('./controller')
	.then('./router.js')
	.into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use( (err, req, res, next) => {
	const {name, message, stack} = err;
	if(name === 'ValidationError')
    // Ou seja, quando der error 400, é porque deu um erro de ValidationError
		res.status(400).json({ error: message})
  if(name === 'RecursoIndevidoError')
    res.status(403).json({ error: message})
  if(name === 'DUPLICATE_ERROR')
    res.status(409).json({ error: message}) // CONFLICT
	else 
    // Se der erro 505, quer dizer que algo ultra bizarro acoanteceu
  // console.log('name', name);
  // console.log('message', message);
  // console.log('stack', stack);
		res.status(505).json({name, message, stack});
	next();
})

// NOT FOUND
app.use(function(req, res, next) {
  res.status(404).send('Sorry can\'t find that API URL!');
});

module.exports = app;