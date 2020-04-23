

1. Install Heroku CLI (command line interface)

https://devcenter.heroku.com/articles/heroku-cli#download-and-install

2. Logar no CLI

> heroku login -i
Inserir user e password

3. Criar o projeto

>  heroku create price-log-server

````
# Indicar que o remote é tal
heroku git:remote -a price-log-server

#push reomte heroku
git push heroku master
````
....

4. Procfile

This is an important step, because without a Procfile, Heroku cannot put your server online.

5. Indica para o git o remote como heroku

heroku git:remote -a price-log-server

onde `price-log-server` é o nome da aplicação

6.  git push to heroku

git push heroku master

**Minha avaliação**
+ (29/03/2019) Deu certo mas o problema é que ele nâo roda no MySQL


========


MYSQL

Precisa cadastrar cartâo de crédtio

1. 

Instalar celarDB: com ele vira um mysql (precisa inserir rcredit card)

 heroku addons:create cleardb:ignite

2. heroku config | grep CLEARDB_DATABASE_URL

gera a url



mysql://b333e9f5079e70:c96a0fa9@us-cdbr-iron-east-01.cleardb.net/heroku_ada239fbb42a51f?reconnect=true

Onde

HOST: us-cdbr-iron-east-01.cleardb.net
USER: b333e9f5079e70
PASS: c96a0fa9
DATABASE: heroku_ada239fbb42a51f

**Extrari dump com `mysqldump`

> https://linuxize.com/post/how-to-back-up-and-restore-mysql-databases-with-mysqldump/
````
mysqldump -u root -p price_log_bd > ex.sql
````
vai pedir a senha


**ENtra no mysql heroku**

mysql --host=us-cdbr-iron-east-01.cleardb.net --user=b333e9f5079e70 --password=c96a0fa9 --reconnect heroku_ada239fbb42a51f



mysql > source /home/rhavel/Documentos/Personal Projects/Comparator-App/price-log-server/ex.sql

**Verificar**

Vai automaticamente ir pro schema DB_NAME, entÂo, vocÊ já está dentro do schema, agora é só acessar como o MYSQL_WORKBENAHC

não esquecer que tem que por `;`


> mysql> describe user;

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

testar em:

https://price-log-server.herokuapp.com/

## OUTROS

**Rodar o Heroku locamente**

na pasta: 

> heroku local

##################################################################

DEPLOY VUE.APP FRONT END

> https://medium.com/binarcode/deploying-vue-apps-to-heroku-the-right-way-26b11c1ae5cd

1. Criar o app no heroku, deixar um git separado e colocar o git.remote para o heroku


10. Como fala na doc ofiicail do historu mode do vue. Vai precisar de `connect-history-api-fallback middleware`

> https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations



https://github.com/bripkens/connect-history-api-fallback

FUNCINOU COM O MODO HISTORY PONDO OS DOIS, COLOCANDO

````javascript
const express = require('express');
var history = require('connect-history-api-fallback')
const path = require('path');
const serveStatic = require("serve-static")

app = express();

app.use(history({
    verbose: true
}))

app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);
````


coloacando os seguintes script em package.json

    "postinstall": "npm run build",
    "start": "node server.js"


## Para dar push no Heroku no price-log-app

copiei a pata `src` e cole aonde tem `src` na outra. Depois faz

git status/add --all/commit -m "acommit"

em seguida faça

`git push heroku master`

Se nâo funcionar, logue no heroku ness apasta (Pelo CLI do Heroku):

heroku login

e entâo faça ospassaso antesrireos denovo

