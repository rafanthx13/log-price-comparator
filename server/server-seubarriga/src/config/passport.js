const passport = require('passport')
const passportJwt = require('passport-jwt')

const secret = 'Segredo!';

const { Strategy, ExtractJwt } = passportJwt;

// sintaxe do consign
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