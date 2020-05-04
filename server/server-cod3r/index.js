const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db; // kenx configurado com o banco
// assim com app.db dentro dos próxmimo intes do consgin vou poder acesar o banco

// A ordem é importante
consign()
	.then('./config/middlewares.js')
	.then('./api')
	.then('./config/routes.js')

app.listen(3000, () => {
	console.log("Listen in Port 3000")
})