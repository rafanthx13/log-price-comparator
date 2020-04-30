# Sistam  de Login - Vue + Express 

## FRONT END
1. Criar Páginas
 + Página de Login
   - Notificar erro de Login
   - Spinner
 + Página de Cadastrar
 + Página de Sem Sessão

## BACK END - Express
LINKS:
+ https://imasters.com.br/back-end/autenticacao-json-web-token-jwt-em-node-js
+ https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router


1. Em Express Installar
 + Lib para Criptografar
   - const bcrypt = require('bcrypt');
 + Lib para o JWT
   - const jwt = require('jsonwebtoken'); 
 + ENV (ambientes (para guardar o secret)) no node
   - npm install dotenv

## Template de Banco de Dados
> https://zinoui.com/blog/storing-passwords-securely

```
CREATE TABLE `price_log_bd`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(256) NULL,
  `user_type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
```


mysql in exprees 

https://stackoverflow.com/questions/40141332/node-js-mysql-error-handling
https://www.w3schools.com/nodejs/nodejs_mysql.asp
https://www.npmjs.com/package/mysql#introduction

connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

EXPRESS

https://blog.fullstacktraining.com/res-json-vs-res-send-vs-res-end-in-express/

res.json é o mesmo que res.send


VUE AUTH
https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex
https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router