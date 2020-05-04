const { authSecret } = require('../../.env')
const passport = require('passport') // valida coisas como google e facebook
const passportJwt = require('passport-jwt') 
const { Strategy, ExtractJwt } = passportJwt // isso até dá pra fazer manualmente como mexer nos headeres, mas isso já agiliza muito

module.exports = app => {
    // parametros para nossa strategy
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        // vai epgar o token com o Beares na frente
    }
    // com essas informaçôes, vou criar a estratégia
    const strategy = new Strategy(params, (payload, done) => {
        // vamos obeter o usuário pelo id
        // done é quando continua a partir dessa promisse
        // Se cai no then, entâo achou esse usuário e vai colocálo em re.user para ser usados naos nosso serviços internos do backENd, isso vai ser útil pra sabermos se o usuário é admin ou nâo dentro das outras API pois, quando hegar nelas já vai ter setado aqui
        app.db('users')
            .where({ id: payload.id })
            .first()
            // na primeira parte "null", colcamos null porque quer dizer que nâo deu erro algum
            // na parte: "user ? { ...payload }" poderia ser o próprio user,
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy) // vai usar ess estrategia

    return {
        // vai ser um midlewares que vai autenticar nas nossas apis
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}