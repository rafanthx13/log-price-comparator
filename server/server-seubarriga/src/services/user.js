const ValidationError = require('../errors/ValidationError');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {

	const findAll = () => {
		return app.db('users').select(['id', 'name', 'mail']);
	}

	const findOne = (filter = []) => {
		return app.db('users').where(filter).first();
	}

	const getPasswordHash = (password) => {
	    const salt = bcrypt.genSaltSync(10);
	    return bcrypt.hashSync(password, salt);
	  };

	const save = async (user) => {
		// console.log(user);
		if(!user.name) 
			throw new ValidationError('Nome é um atributo obrigatório');
		if(!user.mail) 
			throw new ValidationError('Email é um atributo obrigatório');
		if(!user.password) 
			throw new ValidationError('Senha é um atributo obrigatório');

		const userDB = await findOne({ mail: user.mail});
		if(userDB)
			throw new ValidationError("This email already exists in the database.");

		// copio para passar no lint
		const newUser = { ...user };
    	newUser.password = getPasswordHash(user.password);

		return app.db('users').insert(newUser).returning(['id', 'name', 'mail']);	
		
		
		
	}

	return { findAll, findOne, save };
};