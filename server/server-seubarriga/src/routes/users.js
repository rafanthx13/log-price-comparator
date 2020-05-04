const express = require('express');


module.exports = (app) => {

  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.user.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => next(err) );
  });


  // acho qeue nem usa pra nada
  const findOne = (req, res, next) => {
    app.services.user.findAll(filert = [])
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => next(err) );
  };

  // Async await serve para promisse, (no caso o knex.insert) para que
  // tranforma esse bloco em algo sincrono. Vai eseprar finalizar para prosseguir
  router.post('/', async (req, res, next) => {
    try{
      const result = await app.services.user.save(req.body);
      res.status(201).json(result[0]); //  [0] pois retorna uma array
    } catch(err){
      return next(err);
    }
    
    // console.log(result);
    // if(result.error) 
    
  });

  return router;
};
