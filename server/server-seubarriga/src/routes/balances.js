const express = require('express');

module.exports = (app) => {

    const router = express.Router();

    router.get('/', (req, res, next) => {
    	console.log(req.user.id);
        app.services.balance.getSaldo(req.user.id)
            .then(result => {
            	console.log('RESULT: ', result);
            	res.status(200).json(result)
            })
            .catch(err => next(err));
    });

    return router;

};