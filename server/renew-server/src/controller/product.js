const express = require('express');

module.exports = (app) => {

	const router = express.Router();

	router.get('/', (req, res, next) => {
    app.services.product.getAll()
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.get('/name', (req, res, next) => {
    app.services.product.getAllProductsOnlyName()
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.post('/', (req, res, next) => {
    app.services.product.save(req.body)
      .then(result =>  res.status(201).json(req.body))
      .catch(err => next(err) );
  });

  router.put('/:id', (req, res, next) => {
    app.services.product.update(req.params.id, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.delete('/:id', (req, res, next) => {
    app.services.product.remove(req.params.id, req.body)
      .then(result => res.status(204).json(result))
      .catch(err => { next(err); } );
  });

	return router;

}