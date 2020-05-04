const bcrypt = require('bcrypt');

module.exports = (app) => {

	  function getPasswordHash(password){
	    const salt = bcrypt.genSaltSync(10);
	    return bcrypt.hashSync(password, salt);
	  };

		const save = (user) => {
			return app.db('user').insert({ ...user, password: getPasswordHash(user.password)});
		};

		return { save };
}