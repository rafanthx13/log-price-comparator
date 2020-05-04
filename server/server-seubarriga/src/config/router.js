const express = require('express');

module.exports = (app) => {

	// nâo tem 'v1' na frente
	app.use('/auth', app.routes.auth);

	const protectedRouter = express.Router();

	protectedRouter.use('/users', app.routes.users);
	protectedRouter.use('/accounts', app.routes.accounts);
	protectedRouter.use('/transactions', app.routes.transactions);
	protectedRouter.use('/transfers', app.routes.transfers);
	protectedRouter.use('/balances', app.routes.balances);

	// Agora  vai tudo começar com '/v1' a versâo do meu app
	// Acrescentei um midleware adicionao a essa srotas, passar pelo 'autenhticate'
	app.use('/v1',	app.config.passport.authenticate(),
		protectedRouter);
}

