# Estrutura do projeto

Desa forma podermos organizar o procesos de tal forma que cada parte peqeuena de cada funcioannlidade pode ser usada sem um todo:

**BAIXO ACOMPLAEMNTO E ALTA COESÃO**


````
.
├── app.js // app central: onde importa todo o resto
├── config
│   ├── midllewares.js // define midlewares
│   └── routes.js // rotas da aplicação
├── migrations
│   ├── 20200402174758_create_users.js
│   └── 20200405175701_create_table_accounts.js
├── routes // disponibiliza os services
│   ├── accounts.js 
│   └── users.js
├── server.js
└── services // implementaçâo ta etapa do serviço de aceso ao banco
    ├── account.js
    └── user.js

````

Para inserir uma rota
1. Escrever em `config/routes.js` a URL e para qual route vai
2. Define como é tratado o processo e acessa um service
3. Define o service
