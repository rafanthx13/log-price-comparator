const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const ValidationErrror = require('../errors/ValidationError');

// FIXME: Move it to a file that it's in .gitignore
const secret = 'Segredo!';

module.exports = (app) => {

  const router = express.Router();

  router.post('/signin', (req, res, next) => {
    app.services.user.findOne({ mail: req.body.mail })
      .then((user) => {
        if (!user) 
          throw new ValidationErrror('User or password invalid.');
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };
          // payload e secret
          // o payload é um obejto/string particulara e identificatorio para cada usuário
          // o secret deve relamente ser absolutamente secreto
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else 
          throw new ValidationErrror('User or password invalid.');
      })
      .catch((err) => { next(err); });
  });

  router.post('/signup', async (req, res, next) => {
    try{
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result[0]); //  [0] pois retorna uma array
    } catch(err){
      return next(err);
    }
    
    // console.log(result);
    // if(result.error) 
    
  });





  return router  
};