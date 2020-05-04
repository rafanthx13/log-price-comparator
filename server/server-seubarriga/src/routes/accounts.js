const express = require('express');
const RecursoIndevidoError = require('../errors/RecursoIndevidoError');

module.exports = (app) => {

  const router = express.Router();

  // Estamos criadno um middleware adicional
  // para tudo que começar com ':id'
  // Assim, para todos esse caso, vamos verificar
  // Se estamos mesmo mexendo com o usuário
  router.param('id', (req, res, next) => {
    app.services.account.find({ id: req.params.id })
      .then((acc) => {
        // console.log('acc.user_id', acc.user_id)
        // console.log('req.user.id', req.user.id)
        if(acc.user_id !== req.user.id)
          throw new RecursoIndevidoError();
        else next();
      }).catch( err => next(err) );
  });

 router.post('/', (req, res, next) => {
    app.services.account.save({ ... req.body, user_id: req.user.id })
      .then((result) => {
        return res.status(201).json(result[0]);
      }).catch(err => next(err) );
  });

  router.get('/', (req, res, next) => {
    app.services.account.findAll(req.user.id)
      .then(result => res.status(200).json(result))
      .catch(err => { next(err); } );
  });

  router.get('/:id', (req, res, next) => {
    return app.services.account.find({ id: req.params.id })
      .then(result => res.status(200).json(result) )
      .catch(err => next(err) );
  });

  router.put('/:id', (req, res, next) => {
    app.services.account.update(req.params.id, req.body)
      .then( (result) => res.status(200).json(result[0]) )
      .catch( (err) => next(err) );
  });

  // 204 - Nâo vem conteudo, afinal, eu acabei de remover
  router.delete('/:id', (req, res, next) => {
    app.services.account.remove(req.params.id)
      .then( () => res.status(204).send() )
      .catch( (err) => next(err) );
  });

  return router;

};