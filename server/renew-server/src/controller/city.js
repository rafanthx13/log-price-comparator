const express = require('express');

module.exports = (app) => {

	const router = express.Router();

	router.get('/', (req, res, next) => {
    app.services.city.getAll()
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.get('/city', (req, res, next) => {
    app.services.city.getOnlyCity()
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.post('/', (req, res, next) => {
    app.services.city.save(req.body)
      .then(result => res.status(201).json(result))
      .catch(err => next(err) );
  });

  router.put('/:id', (req, res, next) => {
    // console.log('tdsgsdgsgsgsdgs', req.params.id, req.body)
    app.services.city.update(req.params.id, req.body)
      .then(result => {
        // o result do knex é [1 que não é um JSON]
        // Nâo tem como recuperar dados do update, entao voltamos o que já mandamos
        res.status(200).json({city_id: req.params.id, ...req.body});})
      .catch(err => { console.log(err); next(err); } );
  });

  router.delete('/:id', (req, res, next) => {
    app.services.city.remove(req.params.id)
      .then(result => {
        // retorna 1 ou 0
        // console.log("resul saida delete", result);
         res.status(204);
       })
      .catch(err => {console.log("5487983476547589734953"); next(err); } );
  });

	return router;

}