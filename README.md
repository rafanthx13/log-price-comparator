# Price-Log-Comparator

App que possui o preço de certas categorias locais (onde os próprios usuários colocam os preço). Serve para saber qual o lugar está mais barato sem sair de casa.

**Por que usar**: Pois você obtem o preço das coisas antes de ir lá; Você pode saber se o preço de um lugar está mais caro/barato que o normal da redondeza; Saber se os preços de certos itens estâo aumentado ou não;


**Motivação para utilização**: Ao colocar o preço das coisas que você vai vendo, ajuda as outras pessoas. Se todos colocam, então, obtem-se informaçâo de toda a cidade sem precisar sair de casa.

## OUTROS

## router.push
Quando fizer router.push ou alguma mudabça de login, faça pelo nome do compoennte, pois só assim dá pra passar os params, se nâo, se fizer por porexmeplo:

next({ path: '/login', params: { auth: 'false' }, props: { auth: "xxxx"}});

Como no caso acima, o params nao é passado, pois se vocÊ faz um push por path, espera-se que parametros estejam na URL


next({ name: 'Login', params: { auth: 'false' }});

## router -next()

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



