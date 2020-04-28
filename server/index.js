// Expres App API
var express = require('express');
var app = express();

// JWT Auth.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Convert YAML to JSON
const swaggerDocument = YAML.load('./config/swagger.yaml');

// ENV.
const { PORT, API_SECRET } = require("./config/env.config.js");

// BD Acess Functions
var exec_mysql_query = require('./db/exec_query');
var exec_query_callback = require('./db/exec_query_callback');

// Body-Parse and CORS Middlewares
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// API ROUTES

app.get('/', function (req, res) {
  res.send('API It\'s Working!');
});

// CITY

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

// SHOP

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

// PRODUCT

app.get('/product', function (req, res) {
  exec_mysql_query('SELECT * FROM product', res);
});

// Deve busca com query
app.get('/product/name', function (req, res) {
  exec_mysql_query(`SELECT DISTINCT product FROM log WHERE city = '${req.query.city}'`, res);
});

app.post('/product', (req, res) =>{
  const name = req.body.name;
  const type = req.body.type;
  const def_query =  'INSERT INTO product(name, type)'
  const value_query = ` VALUES('${name}','${type}');`
  exec_mysql_query(def_query + value_query, res);
});

// LOG

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

// AUTHORIZATION

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

app.post('/login', function(req, res) {
  let user_name = req.body.user_name;
  let password = req.body.password
  let query = `SELECT * FROM user WHERE user_name = '${user_name}' LIMIT 1`;

  exec_query_callback(query, function(error, results) {
    try {
      if(error) 
        res.status(401).send({ auth: false, token: null, message: "Strange Error" });
      if(results === undefined)
        res.status(401).send({ auth: false, token: null, message: "results is undefinied. Restar Application" });
      if(results.length <= 0)
        res.status(404).send({ auth: false, token: null, message: "User not found"});
      if (bcrypt.compareSync(password, results[0].password)){ 
        let token = jwt.sign({ id: results[0].id }, API_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user_name });
      } else {
        res.status(401).send({ auth: false, token: null, message: "Fail in JWT Validation" });
      }
    } catch (e) {
      // console.error("user_name", user_name, "|| password", password)
      // console.error("results", results)
      console.error("e.mesasge in /login: ", e.message);
    }
    
  }) 
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

// Swagger API Access
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Lidar com Erros 404 (Nâo encontrado). POR DEFINIÇÂO, DEVE SER O ÚLTIMO 'USE'.
app.use(function(req, res, next) {
  res.status(404).send('Sorry can\'t find that API URL!');
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + " ...");
});