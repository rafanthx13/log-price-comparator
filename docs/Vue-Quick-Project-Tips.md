=> Copiar Valor Real Física

variabel.valueOf(), vai retornar um valor e nâo vai ser referencia

## OUTROS

## router.push
Quando fizer router.push ou alguma mudabça de login, faça pelo nome do compoennte, pois só assim dá pra passar os params, se nâo, se fizer por porexmeplo:

next({ path: '/login', params: { auth: 'false' }, props: { auth: "xxxx"}});

Como no caso acima, o params nao é passado, pois se vocÊ faz um push por path, espera-se que parametros estejam na URL


next({ name: 'Login', params: { auth: 'false' }});

## vue-router -next()

o next() deve ser o último método. Quando chega nele, ainda vai continuar a ler o código

entao se feiz algo como abbaixo

if(...)
next()

a = a+ a;

VAI EXECUTAR 'a = a + a'

## Pegar erros do cath de uma promisee

.catch((err) => {
				console.log(err.message);
				this.error_notify('Error de Formulário', 'Dados inseridos inválidos para login')
			});

tem que usar 'err.message'

## Usar Vuex

Depois de configurado, em arquivos vue que já 

{{ this.$store.getters.getUser.codeStatus }}

## vee validate 3.0 - rules

````
import { required, max  } from 'vee-validate/dist/rules'

import { extend, ValidationObserver,
  ValidationProvider, setInteractionMode } from 'vee-validate'

//  nesse caso, sobrescrevemos uma rule padrâo "requires" para mostrar essa mensagem
extend('required', {
  ...required,
  message: 'É necessário inserir dados nesse campo',
})

// Nesse outro caso estamos criando um novo validaor e definindo uma mensagem
extend('date', {
  validate: value => {
    return moment(value, "DD/MM/YYYY hh:mm").isValid();
  },
  message: 'Data Inválida',
});


// Aqui a mensagem de max vai recerb como paarmetro o 'name' que tiver na tag <ValidationProvider>
extend('max', {
  ...max,
  message: (fieldName) => {
    return 'É necessário inserir dados nesse campo:' + fieldName
  }
})
````

## Axios : get errors of http request

para pegar o err no chat, use err.reponse qua ai trira o json que vocÊ mandar devolta

`err.response .... `

````
Product.put(this.editedItem)
	.then( () => {
		this.emitSwal("Sucesso!", "O produto foi editado com sucesso!", "success");
		Object.assign(this.rows[this.editedIndex], this.editedItem)
		this.editClose();
	})
	.catch( err => {
		console.log(err.response, "message");
		let msg = err.status == 404  
			? "O produto já está sendo referenciada em outra tabela e NÃO PODE SER EDITADA" 
			: "Erro ao Editar produto";
		this.emitSwal("Erro!", msg, "error");
		this.deleteClose();
	});
````

Onde response é

"
{	
	"data":
		{"status":404,"message":"Item está referenciado em outra tabela","sqlMessage":"Cannot delete or update a parent row: a foreign key constraint fails (`price_log_bd`.`log`, CONSTRAINT `fk_log_2` FOREIGN KEY (`product`) REFERENCES `product` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION)"},
	"status":404,
	"statusText":"Not Found",
	"headers":{"content-length":"290","content-type":"application/json; charset=utf-8"},
	"config":{"url":"http://localhost:3000/product/27",
	"method":"put",
	"data":"{\"product_id\":27,\"name\":\"Alho2\",\"type\":\"Frutas, Verduras e Legumes\"}","headers":{"Accept":"application/json, text/plain, */*",
	"Content-Type":"application/json",
	"Access-Control-Allow-Origin":"*",
	"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTg4MjY4NzQzLCJleHAiOjE1ODgzNTUxNDN9.yztXvQ0ioXpGkRv4zDdaIIqI4BQxZeCpf7DjHUp92_w"},"baseURL":"http://localhost:300011/",
	"transformRequest":[null],
	"transformResponse":[null],
	"timeout":0,
	"xsrfCookieName":"XSRF-TOKEN",
	"xsrfHeaderName":"X-XSRF-TOKEN",
	"maxContentLength":-1},
	"request":{}
}"

