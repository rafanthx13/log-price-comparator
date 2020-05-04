const ValidationErrors = require('../errors/ValidationError')

module.exports = (app) => {

		// Preciso fazer um join de user => account => conta
		const find = (userId, filter = {}) => {
			return app.db('transactions')
				.join('accounts', 'accounts.id', 'acc_id')
				.where(filter)
				.andWhere('accounts.user_id', '=', userId)
				.select();
		};

		const findOne = (filter = {}) => {
				return app.db('transactions').where(filter).select().first();
		};

		const save = (transaction) => {

				if (!transaction.description) 
					throw new ValidationErrors('Descrição é um atributo obrigatório');
				if (!transaction.ammount) 
					throw new ValidationErrors('Valor é um atributo obrigatório');
				if (!transaction.date) 
					throw new ValidationErrors('Data é um atributo obrigatório');
				if (!transaction.acc_id) 
					throw new ValidationErrors('Conta é um atributo obrigatório');
				if (!transaction.type) 
					throw new ValidationErrors('Tipo é um atributo obrigatório');
				if (transaction.type != '1' && transaction.type != '0') 
					throw new ValidationErrors('Tipo inválido');

				if ((transaction.type == '1' && transaction.ammount < 0) ||
						(transaction.type == '0' && transaction.ammount > 0)) {
						transaction.ammount *= -1;
				}
				// console.log('Cheogu ate aqui');
				return app.db('transactions').insert(transaction, '*');
		};

		const update = (transactionId, transaction) => {
				return app.db('transactions').where({id: transactionId}).update(transaction, '*');
		};

		const remove = (transactionId) => {
				return app.db('transactions').where({id: transactionId}).del();
		};

		return {find, save, findOne, update, remove};

};