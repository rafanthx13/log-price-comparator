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