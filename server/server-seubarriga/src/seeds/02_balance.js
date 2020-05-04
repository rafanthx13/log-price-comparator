const moment = require('moment');

exports.seed = (knex) => {

  return knex('users').insert([
      {id: 10100, name: 'User #3', mail: 'user3@mail.com', password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'},
      {id: 10101, name: 'User #4', mail: 'user4@mail.com', password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'},
      {id: 10102, name: 'User #5', mail: 'user5@mail.com', password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'}
  ]).then(() => knex('accounts').insert([
      {id: 10100, name: 'Acc Saldo Principal', user_id: 10100},
      {id: 10101, name: 'Acc Saldo Secundário', user_id: 10100},
      {id: 10102, name: 'Acc Alternativa 1', user_id: 10101},
      {id: 10103, name: 'Acc Alternativa 2', user_id: 10101},
      {id: 10104, name: 'Acc Geral Principal', user_id: 10102},
      {id: 10105, name: 'Acc Geral Secundário', user_id: 10102}
  ])).then(() => knex('transfers').insert([
      {id: 10100, description: 'Transfer #1', user_id: 10102, acc_ori_id: 10104, acc_dest_id: 10105, ammount: 256, date: new Date()},
      {id: 10101, description: 'Transfer #2', user_id: 10101, acc_ori_id: 10102, acc_dest_id: 10103, ammount: 512, date: new Date()}
  ])).then(() => knex('transactions').insert([
      {description: '2', date: new Date(), ammount: 2, type: '1', acc_id: 10104, status: true},
      {description: '2', date: new Date(), ammount: 4, type: '1', acc_id: 10102, status: true},
      {description: '2', date: new Date(), ammount: 8, type: '1', acc_id: 10105, status: true},
      {description: '2', date: new Date(), ammount: 16, type: '1', acc_id: 10104, status: false},
      {description: '2', date: moment().subtract({days: 5}), ammount: 32, type: '1', acc_id: 10104, status: true},
      {description: '2', date: moment().add({days: 5}), ammount: 64, type: '1', acc_id: 10104, status: true},
      {description: '2', date: moment(), ammount: -128, type: '0', acc_id: 10104, status: true},
      {description: '2', date: moment(), ammount: 256, type: '1', acc_id: 10104, status: true},
      {description: '2', date: moment(), ammount: -256, type: '0', acc_id: 10105, status: true},
      {description: '2', date: moment(), ammount: 512, type: '1', acc_id: 10103, status: true},
      {description: '2', date: moment(), ammount: -512, type: '0', acc_id: 10102, status: true}
  ]));


};