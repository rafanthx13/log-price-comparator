module.exports = app = {
	client: 'mysql',
	connection: {
		host : '127.0.0.1',
        port: 3306,
        database: 'knowledge',
        user: 'root',
        password: 'root'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};