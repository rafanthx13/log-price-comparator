/*eslint comma-dangle: [2, "always"]*/
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
  },
  // falta terminar
  prod: {
    client: 'pg',
    version: '9.6',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      database: 'seubarriga',
    },
    migrations: {
      directory: 'src/migrations',
    },
    
  }

};
