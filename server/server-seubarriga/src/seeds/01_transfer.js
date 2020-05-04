/*
1. Zero tudo antes de inserir alguma coisa
*/
exports.seed = function(knex) {

  return knex('transactions').del()
      .then(() => knex('transfers').del())
      .then(() => knex('accounts').del())
      .then(() => knex('users').del())
      .then(() => knex('users').insert([
          {id: -1, name: 'User #1', mail: 'user1@mail.com', password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'},
          {id: -2, name: 'User #2', mail: 'user2@mail.com', password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'}
      ]))
      .then(() => knex('accounts').insert([
          {id: -1, name: 'AccO #1', user_id: -1},
          {id: -2, name: 'AccD #1', user_id: -1},
          {id: -3, name: 'AccO #2', user_id: -2},
          {id: -4, name: 'AccD #2', user_id: -2}
      ]))
      .then(() => knex('transfers').insert([
          {id: -1, description: 'Transfer #1', user_id: -1, acc_ori_id: -1, acc_dest_id: -2, ammount: 100, date: new Date()},
          {id: -2, description: 'Transfer #2', user_id: -2, acc_ori_id: -3, acc_dest_id: -4, ammount: 100, date: new Date()},
      ]))
      .then(() => knex('transactions').insert([
          {description: 'Transfer from AccO #1', date: new Date(), ammount: 100, type: '1', acc_id: -2, transfer_id: -1},
          {description: 'Transfer to AccD #1', date: new Date(), ammount: -100, type: '0', acc_id: -1, transfer_id: -1},

          {description: 'Transfer from AccO #2', date: new Date(), ammount: 100, type: '1', acc_id: -4, transfer_id: -2},
          {description: 'Transfer to AccD #2', date: new Date(), ammount: -100, type: '0', acc_id: -3, transfer_id: -2},
      ]));
};