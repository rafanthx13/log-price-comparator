
## Criptografar senha `bcrypt`

` npm i -S -E bcrypt-nodejs@0.0.3`

Importano e usando bcript

````javascript
const bcrypt = require('bcrypt-nodejs');

const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

newUser.password = getPasswordHash(user.password);
````

## `jwt-simple`

`npm i -S jwt-simple`

````javascript
// ./src/routes/auth.js

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationErrror = require('../errors/ValidationError');

// FIXME: Move it to a file that it's in .gitignore
const secret = 'Segredo!';

module.exports = (app) => {

  const signin = (req, res, next) => {
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
  };

  return { signin };

};

````

## Proteger toas `passport`

Aqui, definimos o  `authenticate`, com a autentificação da extração do Header.

`npm i -S -E passport@0.4.0`

`npm i -S -E passport-jwt@4.0.0`

````javascript
/src/config/passport.js
const passport = require('passport')
const passportJwt = require('passport-jwt')

const secret = 'Segredo!';

const { Strategy, ExtractJwt } = passportJwt;

// sintaze do consign
module.exports = (app) => {

  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  // strategia do que sera a autenticação ou não
  // busco o usuário pelo ID e vou ter os 3 dados do payload {id, name, email}
  const strategy = new Strategy(params, (payload, done) => {
    app.services.user.findOne({ id: payload.id })
      .then((user) => {
        if (user) // se encontrado
          done(null, { ...payload })
        else 
          done(null, false)
      }).catch(err => done(err, false)); //
  });

  // digo para atentitca com essa strategia
  passport.use(strategy);

  // ao final, retorno o objeto que eu quero utilizar
  return {
    authenticate: () => 
      passport.authenticate('jwt', { session: false })
  };
};
````
