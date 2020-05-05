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

// Error Handler
app.use( (err, req, res, next) => {
	const { name, message, stack } = err;
	if(name === 'VALIDATION_ERROR')
		res.status(400).json({ error: message }) // BAD REQUEST
  else if(name === 'RecursoIndevidoError')
    res.status(403).json({ error: message })
  else if(name === 'DUPLICATE_ERROR')
    res.status(409).json({ error: message }) // CONFLICT
  else if(name === 'NOT_FOUND_ERROR')
    res.status(404).json({ error: message }) // NOT FOUND
	else if(stack)
		res.status(500).json({ name, message, stack }); // INTERNAL SERVER ERROR
	else
		next();
})

// NOT FOUND
app.use(function(req, res, next) {
  res.status(404).send('Sorry can\'t find that API URL!');
});

module.exports = app;