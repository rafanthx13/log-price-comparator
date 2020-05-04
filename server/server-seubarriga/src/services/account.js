const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {

  const findAll = (userId) => {
    return app.db('accounts').where({ user_id: userId }).select();
  }

  const find = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const save = async (account) => {    
  	if(!account.name) 
		  throw new ValidationError('Nome é um atributo obrigatório.');

    const accDb = await find({ name: account.name, user_id: account.user_id })
    if(accDb)
      throw new ValidationError('Já existe conta com esse nome');

    return app.db('accounts').insert(account, '*');
  }

  

  const update = (id, account) => {
    return app.db('accounts').where({ id }).update(account, '*');
  };

  
  // so remove conta se nao houver transaçoes nela
  const remove = async (id) => {
        // busca se há transaçoes para esse id de conta
        const transaction = await app.services.transaction.findOne({acc_id: id});
        if (transaction) 
          throw new ValidationError('Essa conta possui transações associadas');
        return app.db('accounts').where({id}).del();
    };

  return { findAll, save, find, update, remove};
}