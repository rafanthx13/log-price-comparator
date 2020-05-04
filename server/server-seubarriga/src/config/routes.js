// module.exports = (app) => {

//   app.route('/users')
//     .all(app.config.passport.authenticate())
//     .get(app.routes.users.findAll)
//     .post(app.routes.users.create);

//   app.route('/accounts')
//     .all(app.config.passport.authenticate())
//     .get(app.routes.accounts.findAll)
//     .post(app.routes.accounts.create);

//    app.route('/accounts/:id')
//     .all(app.config.passport.authenticate())
//     .get(app.routes.accounts.get)
//     .put(app.routes.accounts.update)
//     .delete(app.routes.accounts.remove);

//   app.route('/auth/signin').post(app.routes.auth.signin);
//   app.route('/auth/signup').post(app.routes.users.create);
  
// };

// Nâo preciso mais dleel, está caogra como
// router.js para lsitar todas as rotas
// cada parte do '/routes' para cada uma das rotas listadas no router e seu tratamento