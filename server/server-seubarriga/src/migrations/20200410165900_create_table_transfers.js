
/// uso 'Promisse' pois vou precisar de mais de uma
exports.up = function(knex, Promise) {
   return Promise.all([
        knex.schema.createTable('transfers', (t) => {
            t.increments('id').primary();
            t.string('description').notNull();
            t.date('date').notNull();
            t.decimal('ammount', 15, 2).notNull();
            t.integer('acc_ori_id').references('id').inTable('accounts').notNull();
            t.integer('acc_dest_id').references('id').inTable('accounts').notNull();
            t.integer('user_id').references('id').inTable('users').notNull();
        }),
        // uma segunda promise, responsavel por adicionar 'transfer_id' em outra tabela
        knex.schema.table('transactions', (t) => {
            t.integer('transfer_id').references('id').inTable('transfers');
        })
    ]);
};

// o invero do que fizamoe antes
exports.down = function(knex, Promise) {
   return Promise.all([
        knex.schema.table('transactions', (t) => {
            t.dropColumn('transfer_id');
        }),
        knex.schema.dropTable('transfers')
    ]);
};
