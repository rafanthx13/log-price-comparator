# Deploy do Server Node-Express no Heroku

+ Deploy no Heroku
  - https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/#Deploy_the_app_to_Heroku

## Deploy pelo Heroku

### 1. Install Heroku CLI (command line interface)

https://devcenter.heroku.com/articles/heroku-cli#download-and-install

### 2. Logar no CLI

````
> heroku login -i
````
Inserir user e password

### 3. Criar o projeto heroku, setar git e remote

>  heroku create price-log-server

````
# Criar projeto heroku remoto
> heroku create price-log-server
````
....

### 4. Criação de Procfile

This is an important step, because without a Procfile, Heroku cannot put your server online.

É o arquivo que inicializa o node no remote

> Procfile
````
web: node index.js
````

### 5. Indica qual o endereço remoto e manda pra la

````
# Indicar que o remote é esse
> heroku git:remote -a price-log-server

# Mandar para o heroku
> git push heroku master
````
**Minha avaliação**
+ (29/03/2019) Deu certo mas o problema é que ele não roda no MySQL

## Instalação do MYSQL no Heroku

**Precisa cadastrar cartâo de crédtio**

### Inserir add-on do mysql

Dentro da sua aplicação local heroku

Instalar ClearDB: com ele vira um mysql 

````
> heroku addons:create cleardb:ignite

# Deve aparecer algo como ...
Creating cleardb:ignite on ⬢ bezkoder-nodejs-mysql... free
Created cleardb-cubed-17749 as CLEARDB_DATABASE_URL
Use heroku addons:docs cleardb to view documentation
````

Depois temos que pegar a URL e dados do banco, através do comando a seguir

````
> heroku config | grep CLEARDB_DATABASE_URL

# E gera algo como ...
CLEARDB_DATABASE_URL: mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true
````

Depois use esse  valor `mysql` pra confugurar

````
$ heroku config:set DATABASE_URL='mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true'
````



# Vai gerar algo como
Setting DATABASE_URL and restarting ⬢ bezkoder-nodejs-mysql... done, v6
DATABASE_URL: 'mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true'
````
Gerando assim as configurações do Banco Externo

````javascript
module.exports = {
  HOST: "us-cdbr-iron-east-02.cleardb.net",
  USER: "b7e2437887xxxa",
  PASSWORD: "0200xxx6",
  DB: "heroku_7643ec736354xxx"
};

````

A porta padão é `DB_PORT=3306`, a mesma do MYSQL default

## Extrair `dump` com `mysqldump`

> https://linuxize.com/post/how-to-back-up-and-restore-mysql-databases-with-mysqldump/

````
mysqldump -u root -p price_log_bd > ex.sql
````
vai pedir a senha

## Entrar no MySQL do Heroku e inserir DUMP

**Entrar no mysql do heroku**

````
mysql --host=us-cdbr-iron-east-01.cleardb.net --user=b333e9f5079e70 --password=c96a0fa9 --reconnect heroku_ada239fbb42a51f
````
**Enviar Dump**

````
mysql > source /home/rhavel/Documentos/Personal Projects/Comparator-App/price-log-server/ex.sql
````

**Verificar**

+ Vai automaticamente ir pro schema DB\_NAME, então, você já está dentro do schema, agora é só acessar como o MYSQL_WORKBENC
+ não esquecer que tem que por `;` nos comandos.

````
> mysql> describe user;
````

Vai visualizar:

````
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_name | varchar(45)  | YES  |     | NULL    |                |
| email     | varchar(45)  | YES  | UNI | NULL    |                |
| password  | varchar(256) | YES  |     | NULL    |                |
| user_type | varchar(45)  | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0,15 sec)

````

## OUTROS

### Rodar o Heroku locamente

na pasta do projeto que tem o heroku remote

````
> heroku local
````

### Ver Logs do Heroku Remote

Aonde estiver o projeto backEnd rode

````
> heroku logs --tail
````

Restar tudo (quando der um erro)
> heroku dyno:restart

> heroku git:clone -a price-log-app

