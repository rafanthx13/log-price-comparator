const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../src/app');

const MAIN_ROOT = '/v1/transactions';

let user;
let user2;
let accUser;
let accUser2;

// OBS: O type da transactiond eve ser 1/0, e nâo I/O como ele fez

// Transações envolvem uma conta e um usuário
// Vamos colocar no beforeAll
// Aqui, uso 'async' para simplificar os vários 'then'que deveria ter sem ele
beforeAll( async () => {
	// OBS: Estou zerando as tabelas, então, pode dar problema em outros testes que precissarem de ja ter dado na tabela
	// deve ser naessa ordem pois nao da pra zerar accounts se houver transactions
	await app.db('transactions').del();
  await app.db('transfers').del();
	await app.db('accounts').del();
	await app.db('users').del();
	// Vou inserir direto no bd pelo knex
	const users = await app.db('users').insert([
				{name: 'User #1', mail: 'user@mail.com',  password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'},
				{name: 'User #2', mail: 'user2@mail.com', password: '$2a$10$EWdWW3R572JLPgHI346vD.72toRY0d73WBILLeqZ2sy2EdSkz.zFO'}
		], '*');
		// O '*' serve para o que insei, retornar pra mim mesmo
		[user, user2] = users;
		delete user.password; // ???
		user.token = jwt.encode(user, 'Segredo!');

		const accs = await app.db('accounts').insert([
				{name: 'Acc #1', user_id: user.id},
				{name: 'Acc #2', user_id: user2.id}
		], '*');
		[accUser, accUser2] = accs;
})

/* Test 1) Vou inserir duas transações, uma para cada usuário criado no 'beforeAll'
e ao requisitar, vou esperar que retorne somente a transação de um único usuário, 
a 'T1' para a conta do usuário 1.
*/
test('Deve lsitar apenas as transações do usuário', () => {
	return app.db('transactions').insert([
		{ description: 'T1', date: new Date(), ammount: 100, type: '1', acc_id: accUser.id},
		{ description: 'T2', date: new Date(), ammount: 300, type: '0', acc_id: accUser2.id}
	]).then(() => request(app).get(MAIN_ROOT).set('authorization', `bearer ${user.token}`))
		.then(res => {
				expect(res.status).toBe(200);
				expect(res.body).toHaveLength(1);
				expect(res.body[0].description).toBe('T1');
		});
});

/* Test 2) Insere uma transação numa conta
*/
test('Deve inserir uma transação com sucesso', () => {
	return request(app).post(MAIN_ROOT)
		.set('authorization', `bearer ${user.token}`)
		.send({description: 'New T', date: new Date(), ammount: 100, type: '1', acc_id: accUser.id})
		.then(res => {
				expect(res.status).toBe(201);
				expect(res.body.acc_id).toBe(accUser.id);
				expect(res.body.ammount).toBe('100.00');
		 });
});

/* Test 3) Insiro e busco por ID, e deve retornar a transação pelo ID 
*/
test('Deve retornar uma transação por id', () => {
   return app.db('transactions')
       .insert({description: 'T ID', date: new Date(), ammount: 100, type: '1', acc_id: accUser.id}, ['id'])
       .then(trans => request(app).get(`${MAIN_ROOT}/${trans[0].id}`).set('authorization', `bearer ${user.token}`)
       .then(res => {
           expect(res.status).toBe(200);
           expect(res.body.id).toBe(trans[0].id);
           expect(res.body.description).toBe('T ID');
       }));
});

/* Test 4) Deve alterar uma transação pelo ID
Vou inserir ruma transaçâo e depois alterala
*/
test('Deve alterar uma transação', () => {
    return app.db('transactions')
      .insert({description: 'To Update', date: new Date(), ammount: 100, type: '1', acc_id: accUser.id}, ['id'])
      .then(trans => request(app).put(`${MAIN_ROOT}/${trans[0].id}`).set('authorization', `bearer ${user.token}`)
        .send({description: 'Updated'})
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(trans[0].id);
            expect(res.body.description).toBe('Updated');
        }));
});

/* Test 5) Cria uma e depois a remove
*/
test('Deve remover uma transação', () => {
    return app.db('transactions')
        .insert({description: 'To Remove', date: new Date(), ammount: 200, type: '1', acc_id: accUser.id}, ['id'])
        .then(trans => request(app).delete(`${MAIN_ROOT}/${trans[0].id}`)
            .set('authorization', `bearer ${user.token}`))
        .then(res => {
            expect(res.status).toBe(204);
        });
});

/* Test 6) Seve para transactions:id para get/put/delete; 
Quando você manda o token, o banco vai identificar o usário e vai saber o seu ID. Aí quando você faz um get/put/delete por ID
Ele vai buscar antes se esse :id pertence ou nâo ao usuário. Assim estamos bloqueado o acesso de um usuário válidos
a dados que não sejam dele.
*/
test('Não deve remover uma transação de outro usuário', () => {
    return app.db('transactions')
        .insert({description: 'To Remove2', date: new Date(), ammount: 100, type: '1', acc_id: accUser2.id}, ['id'])
        .then(trans => request(app).delete(`${MAIN_ROOT}/${trans[0].id}`)
            .set('authorization', `bearer ${user.token}`))
        .then(res => {
            expect(res.status).toBe(403);
            expect(res.body.error).toBe('Este recurso não pertence ao usuário');
        });
});

/* Test 7) Transaçôes do Tipo I => 1 (Significa Entrada) devem ser positivas sempre.
Deve alterar na aplicação de Negativo => Positivo se indicar que é do TIpo 1 (POSITIVO)
*/
test('Transações de entrada devem ser positivas', () => {
    return request(app).post(MAIN_ROOT)
        .set('authorization', `bearer ${user.token}`)
        .send({description: 'New T', date: new Date(), ammount: -100, type: '1', acc_id: accUser.id})
        .then(res => {
            expect(res.status).toBe(201);
            expect(res.body.acc_id).toBe(accUser.id);
            expect(res.body.ammount).toBe('100.00'); // alterou de - => +
        });
});

/* Test 8) Transaçôes do Tipo O => 0 (Significa Entrada) devem ser Negativas sempre.
Deve alterar na aplicação de Positivo => Negativo se indicar que é do TIpo 0 (Negativo)
*/
test('Transações de saída devem ser negativas', () => {
    return request(app).post(MAIN_ROOT)
        .set('authorization', `bearer ${user.token}`)
        .send({description: 'New T', date: new Date(), ammount: 100, type: '0', acc_id: accUser.id})
        .then(res => {
            expect(res.status).toBe(201);
            expect(res.body.acc_id).toBe(accUser.id);
            expect(res.body.ammount).toBe('-100.00'); // alterou de + => -
        });
});

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

/* Test 9) inseiro uma transaçâ e depois tento remover uma conta
OBS: deveria estar em accounts
*/
test('Não deve remover uma conta com transação', () => {
  return app.db('transactions')
    .insert({description: 'To Remove', date: new Date(), ammount: 200, type: '1', acc_id: accUser.id}, ['id'])
    .then(() => request(app).delete(`/v1/accounts/${accUser.id}`)
        .set('authorization', `bearer ${user.token}`))
    .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Essa conta possui transações associadas');
    });
});