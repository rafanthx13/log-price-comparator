# API REST em Node.JS aplicando testes (TDD) desde o princípio

Link:
> https://www.udemy.com/course/api-rest-nodejs-com-testes/

Subtítulo: Utilize o TDD para desenvolver um gerenciador financeiro com a segurança dos testes automatizados sempre a seu lado

Tutor: Francisco Wagner Costa Aquino - Analista de Testes

Descrição: Criação de API Node/Express com TDD (Teste por funcionaldiade, não é unitário). VS Code com Ambiente e Dicas

**Porque criar teste**: Imagina que vocÊ faz uma funcionalidade e aí vocÊ testa. Na funcionaldiade 100, para garantir, vocÊ deveria testar todas as anteriroes. Com testes automatizados ela já vai fazer automaticamente.

**PROJETO inteiramente orientado a testes**

## Tópicos

+ `1 - VSCode Tips.md`
+ `2 - Lint.md`
+ `3 - Test JS - Jest.md`
+ `4 - Express Tips.md`
+ `5 - Postgres.md`
+ `6 - JS lib - Knex.md`


UM DETALHE IMPITARATE: 

Ao refatorar e criar o projeto, muitas vezes agente esquece alguma coisa, uma vírugla, ou deixar algum de fora, enfim, passa várias cosias sem perceber (ISOS SEMPRE AOCNTECE).

Com os testes, eu posso saber mais ou menos onde tá o problema. Se eu coloco pra dar erro 404 por exemplo, significa que, se ao esperar um request positivo der 404 significa que: "BUSCOU-SE ALGO QUE NÂO EXISTE", OU SEJA, PROVALVEMNTE A ROTA TA COM PRLBEMA ('Falta um /, ou algo que deveria ser post tá como get e etcc..). 

**COM OS TENTSE, PODEMOS DESCOBIRR ONDE ERRAMOS AO REFATORAR COISAS GRANDES NO CÓDIGO**

**ULTRA**

O PassPort coloca os dadados do usuário em "req.user". Asism, tendo apenas o token, vocÊ pode ter o id do usuário sem precisar mandar pelo post


## Esttrutura do BD

USER
	Account
		Transactions	Transfers (onde 1 tranfer = 2 transaction: uma do dinheiro saindo e outra do dinheiro entradano, isso facilita o cálcuo do slado)
	Saldo

## Questao de coebrtura

ELa nÂos erve pra dizer que o código nâo tem error, mas que para aqueles testes e para queels parametros espceicicos (ou para certas funcioandalidedes em certo cenários) tudo deu certo

**O MAIOR FOCO DA COBERTURA É SABER AONDE É QUE NÂO FOI TESTADO**

No jest basta colcar `--coverage` em pacakge.json na parte do script do jest

## Problemas do `npm run test`

Os tenestse sâo em paralelos e muita coisa fica embaralhada. POr isos, provalvmenvete vai dar erro se der `npm run test` mas nao durara se fizer no `nppm run secure-mode` pois esse é em cada um particular.

Uma forma de tranformas os testse em algo mais síncrono e sequencial é por `--runInBan` em `package.json` na parte do `jest`

Sem ele, por exemplo, acontece muito problema em `users.test.js` pois um usuário que é criado lá em outra suite de teste é deletado, aí quando vai autenticar dá problema.

#### Erro ao por `runInBand` no  `npm run test`

Se aparecer isso:
````
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
````

Se com `runInBand` der um erro estranho no final,  coloc`--forceExit`


## husky

 Ultima aula da parte de corberutra: "Obriga a ter lint e a fazer um test antes de dar um commit"










## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!V## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!## !!!!!!!!!!!!!!!!!!!!!!!!!!V

NO FINAL, /balance nao ta funcionando e eu nao sei porque, pois numa ghora taba e agora nao esta mais

FALTA A PARTE DE PRODUÇÃO
