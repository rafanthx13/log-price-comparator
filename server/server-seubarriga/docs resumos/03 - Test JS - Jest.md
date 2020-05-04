## JEST

`npm i -D jest@23.6.0 -E` : Baixar como Dependencia de Dev extamente essa venrsâo e nunca atualizar o JEST para uma funçâo maior

executar

`./node_modules/.bin/jest`

no npm

`"test": "jest"`
executar 

`npm test`

````
test('Devo saber trabalhar com objetos', () => {
 const obj = { name: 'John', mail: 'jhon@gmail.com' };

expect(obj).toHaveProperty('name', 'John');
expect(obj.name).toBe('John');

const obj2 = { name: 'John', mail: 'jhon@gmail.com' };
expect(obj).toEqual(obj2); // Se for ToBe(), só daria certo comparando come ele mesmo
````

## SUper Test

npm i -D -E supertest@3.3.0


## Modo "Secure-mode"

"secure-mode": "jest --watch --verbose=true"

ao executar `npm run secure-mode`

vai exeutar um looping infinito que vai vigiar as todos os arquivos. VOcê pode passar parametors para especificar o que será testado.

**DESSA FORMA, CADA VEZ QUE VOCÊ SALAVA UM ARQUIVO, VAI REEZECUTAR OS TESTE**

com `--verbose=true` vai mostrar em qual teste que deu um problemagn

## Outras coisas

**`test.skip`**

Pula um testes

**`test.only`**

Desse arquivo, eu quero que seja executado somente um único teste

## Tests asincronos

há 3 formas

````
// 1 FORMA: PROMISSE - THEN
// nao posso esquecer de retornar o return
// é mais preferível dessa forma
test('Não deve inserir usuário sem nome', () => {
  return request(app).post('/users')
    .send({ mail: 'walterxx@gmail.com', password: '123456'})
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório')
    })
});

// Esse test é igual ao anterior, mas vamos fazelo
// de forma difenrete pra aprender a fazer de outras formas
// 2 FORMA - Com Async Await
test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users')
    .send({name: 'Walter Mitty', password: '123456'});
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório')
});


// 3 FORMA - com Done
// done, é o final que serve pra decidir que chegou ao fim
// posso colocar done.fail() indicando que falhou obrigatoriamente
// nao posso esquecer de colaor o done
test('Não deve inserir usuário sem senha', (done) => {
  request(app).post('/users')
    .send({ name: 'Walter Mitty', mail: 'walterxx@gmail.com'})
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório')
      done();
    }).catch(err => done.fail(err));
});

````

## `describe` uma bateria de testes com mesmo template

A describe agrupa testes relacionado como que numa mini suit dentro do arquivo de test

````javascript

/* Test 8) Tempalte para vários teste de validação de uma inserção
*/
describe('Ao tentar inserir uma transação inválida', () => {

  let validTransaction;

  // funciona apenas dentro do describe
  beforeAll(() => {
      validTransaction = {description: 'New T', date: new Date(), ammount: 100, type: '1', acc_id: accUser.id};
  });

  // Template do teste. Vou fazer uma insert de transaction com dados validos e o invalido estara em 'newData' que vai sobrescrever
  const testTemplate = (newData, errorMessage) => {
    return request(app).post(MAIN_ROOT)
      .set('authorization', `bearer ${user.token}`)
      .send({... validTransaction, ...newData}) // clona uma transação válida, mas permite sobrescrita de attrs que tiverem no 'newData'
      .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.error).toBe(errorMessage);
      });
  };

  // Vai sobrescrevre o description para Null, assim, o 'newData' vai mudar o 'validTransaction'
  test('Não deve inserir sem descricao', () => {
    return testTemplate({ description: null }, 'Descrição é um atributo obrigatório')
  });

  test('Não deve inserir sem valor',
      () => testTemplate({ ammount: null }, 'Valor é um atributo obrigatório'));

  test('Não deve inserir sem data',
      () => testTemplate({ date: null }, 'Data é um atributo obrigatório'));

  test('Não deve inserir sem conta',
      () => testTemplate({ acc_id: null }, 'Conta é um atributo obrigatório'));

  test('Não deve inserir sem tipo',
      () => testTemplate({ type: null }, 'Tipo é um atributo obrigatório'));

  test('Não deve inserir com tipo inválido',
      () => testTemplate({ type: 'A'}, 'Tipo inválido'));

});
````

## pacakge.json

"secure-mode": "jest --watchAll --verbose=true"

com whatALl eu posso por um parametro apos chamalos

`npm run secure-mode transfer`

assim vai buscar tests os sqruivos que tiverem o regex combinado com 'tranfers'