# consign

Organiza arquivos do express, deixa-os separados e faciltia incluilos

links de outra socisas?
https://www.luiztools.com.br/post/boas-praticas-de-arquitetura-com-nodejs-express/
https://walde.co/2016/10/24/estrutura-de-diretorios-e-arquivos-em-projetos-node-js/
https://medium.com/@mateus1198/como-estruturo-meus-projetos-usando-express-e-nodejs-ac9a0daa5ed5
https://medium.com/@diomalta/como-organizar-e-estruturar-projetos-com-node-js-4845be004899

##  Tratamento de Erros unificado por MidlewWares


Por Midlewares eu posso unificar os erros pondo como ultimo midleware da aplicação

````javascript
//app.js
app.use( (err, req, res, next) => {
	const {name, message, stack} = err;
	if(name === 'ValidationError')
		res.status(400).json({ error: message})
	else 
		res.status(505).json({name, message, stack});
	next()
})
````

Asimm, em `router` vai ficar

````javascript
//routes/accounts.js
const create = (req, res, next) => {
    app.services.account.save(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      }).catch(err => next() );
  }
````

Eu só dou um net, pois, se houver um erro que é gerado no service, vai ser pego no middleware pelo next

Ex de como ta no `service/account`

````javascript

const save = async (account) => {
  	if(!account.name) 
		throw new ValidationError('Nome é um atributo obrigatório.');
    return app.db('accounts').insert(account, '*');
  }


````

**ASIM CRIO UM TRATAMENTO GENERICO DE ERRO QUE PODE SER ESPECIFICADO NUM LUGAR SÓ**
