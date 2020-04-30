# Deploy Heroku Fron-End Vue

## Links

+ https://medium.com/binarcode/deploying-vue-apps-to-heroku-the-right-way-26b11c1ae5cd
+ https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

## 1. Criar o app no heroku, deixar um git separado e colocar o git.remote para o heroku

Mesmo passao que o de BackEnd

````
# Logar no Heroku CLI
> heroku login -i

# Criar projeto heroku remoto
> heroku create price-log-server

# Indicar que o remote é esse
> heroku git:remote -a price-log-server
````

## 2. Configurando o Vue e seu `history mode`

O vue é rodado através de um servidor simples express mais algumas libs para o deploy correto.

Como fala na documentação oficial, o `history mode` do vue router precisa de `connect-history-api-fallback middleware`

Entâo, é necessário criar um arquivo para configurar esse express, aqui será o  `server.js`

````javascript
// server.js
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
E é necessário adicionar o seguinte script em `package.json`

````json
    "postinstall": "npm run build",
    "start": "node server.js"
````

## 3. Mandando para o Heroku

Pelo git

````
> git add --all

> git commit -m "msg do commit"

> git push heroku master
````

**O que eu fiz**
+ Criei um rep local separado com o remote para o heroku, que tem os arquivos de config do banco
+ O que faço é apaenas passar os arquivos de front pra lá em geral a pasta `/src`