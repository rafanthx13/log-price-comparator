var express = require('express');
var app = express();

// MidleWares.
const cors = require('cors')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bcryptNumber = 8;

// ENV.
const { PORT, API_SECRET } = require("./env/env_config.js");
const port = PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// BD Connection.
var exec_mysql_query = require('./config/mysql_connection');
var checkPassword = require('./config/checkPassword');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/city', function (req, res) {
  exec_mysql_query('SELECT * FROM city', res);
});

app.get('/city/city', function (req, res) {
  exec_mysql_query('SELECT city FROM city', res);
});

app.post('/city', (req, res) =>{
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  exec_mysql_query(`INSERT INTO city(city, state, country) VALUES('${city}','${state}', '${country}');`, res);
});

app.get('/shop', function (req, res) {
  exec_mysql_query('SELECT * FROM shop', res);
});

app.get('/shop/name', function (req, res) {
  exec_mysql_query('SELECT name FROM shop', res);
});

app.get('/shop/city', function (req, res) {
  console.log(req.query.city_name)
  exec_mysql_query(`SELECT name FROM shop WHERE city = '${req.query.city_name}'`, res);
});

app.post('/shop', (req, res) =>{
  const name = req.body.name;
  const cep = req.body.cep;
  const number = req.body.number;
  const street = req.body.street;
  const neighbor = req.body.neighbor;
  const city = req.body.city;
  const def_query =  'INSERT INTO shop(name, cep, number, street, neighbor, city)'
  const value_query = ` VALUES('${name}','${cep}', ${number}, '${street}', '${neighbor}', '${city}');`
  exec_mysql_query(def_query + value_query, res);
});

app.get('/product', function (req, res) {
  exec_mysql_query('SELECT * FROM product', res);
});

app.get('/product/name', function (req, res) {
  exec_mysql_query('SELECT name FROM product', res);
});






// Apenas Registra
app.post('/register', function(req, res) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  let user_name = req.body.user_name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, salt);
  console.log(password);
  let user_type = req.body.user_type || '';

  let query = ` INSERT INTO user (user_name, email, password, user_type)
    VALUES ( '${user_name}', '${email}', '${password}', '${user_type}');`
  exec_mysql_query(query, res);
  
});

// Recupera o token apos logar
app.post('/login', function(req, res) {
  let user_name = req.body.user_name;
  let password = req.body.password

  checkPassword(user_name, password, API_SECRET, res) 

  // Ta gerando uma senha diferente toda hora
  // let password = bcrypt.hashSync(req.body.password, 8)

});

app.get('/auth', function(req, res) {
  let token = req.headers['authorization'];
  if (!token) 
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, API_SECRET, function(err, decoded) {
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    res.status(200).send(decoded); // pode tirar esse decode, nao vou usar pra nada
  });
});











app.post('/product', (req, res) =>{
  const name = req.body.name;
  const type = req.body.type;
  const def_query =  'INSERT INTO product(name, type)'
  const value_query = ` VALUES('${name}','${type}');`
  exec_mysql_query(def_query + value_query, res);
});

app.get('/log', (req, res) => {
  exec_mysql_query('SELECT * FROM log', res);
});

app.post('/log/get', (req, res) => {
  const product = req.body.product;
  const city    = req.body.city;
  const query = `SELECT * FROM log WHERE product = '${product}' AND city = '${city}';`;
  exec_mysql_query(query, res);
});

app.post('/log', (req, res) =>{
  const product = req.body.product;
  const price = req.body.price;
  const shop = req.body.shop;
  const city = req.body.city;
  const date = req.body.date;
  const def_query =  'INSERT INTO log(product, price, shop, city, date)'
  const value_query = ` VALUES('${product}','${price}', '${shop}', '${city}', '${date}');`
  exec_mysql_query(def_query + value_query, res);
});

//INSERT INTO `price_log_bd`.`log` (`log_id`, `product`, `price`, `shop`, `city`, `date`)
//  VALUES ('2', 'asfa', '4.5543', 'fasfa', 'dgdggd', '30-02-1998');


// Lidar com Erros 404 (Nâo encontrado).
// POR DEFINIÇÂO, DEVE SER O ÚLTIMO 'USE'.
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(port, function () {
  console.log('App listening on port ' + port);
});

function checkPassword(password){

}



// router.post('/clientes', (req, res) =>{
//   const nome = req.body.nome.substring(0,150);
//   const cpf = req.body.cpf.substring(0,11);
//   execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
// });

/*
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
});
router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});
router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
});
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
*/




