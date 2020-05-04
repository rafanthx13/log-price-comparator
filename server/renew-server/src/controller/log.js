const express = require('express');

module.exports = (app) => {

	const router = express.Router();

	router.get('/', (req, res, next) => {
    app.services.log.getAllFormatedLogs()
      .then(result => res.status(200).json(result[0]))
      .catch(err => { next(err); } );
  });

  router.get('/search', (req, res, next) => {
    app.services.log.getAllLogsByCityShop(req.query.product, req.query.city)
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.post('/', (req, res, next) => {
    app.services.log.save(req.body)
      .then(result => res.status(201).json(req.body))
      .catch(err => next(err) );
  });

  router.put('/:id', (req, res, next) => {
    app.services.log.update(req.params.id, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.delete('/:id', (req, res, next) => {
    app.services.log.remove(req.params.id, req.body)
      .then(result => res.status(204).json(result))
      .catch(err => { next(err); } );
  });

	return router;

}