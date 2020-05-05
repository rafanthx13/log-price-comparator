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
    app.services.city.update(req.params.id, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.delete('/:id', (req, res, next) => {
    app.services.city.remove(req.params.id)
      .then(result => res.status(204).json({result}))
      .catch(err => next(err) );
  });

	return router;

}

// {
//   "city": "CityTestRE",
//   "state": "StateTest"
//   "country": "CountryTest"
// }