
exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name').notNull();
    t.string('mail').notNull().unique();
    t.string('password').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users')
};

//executar a imigração
// Os arquivos tem um timestmp pra saber a ordme em que foram executados

// Isso vai gerar a tabela no posgress
// node_modules/.bin/knex migrate:latest --env test

// voltar
// node_modules/.bin/knex migrate:rollback --env test
