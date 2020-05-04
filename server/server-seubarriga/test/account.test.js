const request = require('supertest');
const app = require('../src/app');
const jwt = require('jwt-simple');

const MAIN_ROUTE = '/v1/accounts';

// Vamo precisar que já exista um usuário para fazermos os testes
let user;

let user2;



// beforeAll: Executado uma única vez antes de todos os testes
// beforeEach: Executa uma vez para cada testes, se sâo 20, vai executar 20 vezes
// Antes de qualquer teste ser executado
beforeAll(async () => {
	// Nao ta funcionando direito
  const res = await app.services.user.save({
    name: 'Tester User',
    mail: `${Date.now()}@email.com`,
    password: '12356'
  });
  // Na prática, estou clonando esse resultado para não trabalhar com referência de endereço
  user = { ...res[0] };
  user.token = jwt.encode(user, 'Segredo!');

  const res2 = await app.services.user.save({
    name: 'Tester User2',
    mail: `${Date.now()}@hmail.com`,
    password: '12356'
  });

  user2 = { ...res2[0] };


})

// Esse teste deveria ser um dos ultimos, mas, como ele conta a quantidade de contas
// ou eu coloca ele na frente dos outros ou eu coloc "beforeEach"
test('Deve listar apenas as contas de um usuário', async () => {
  // Lembre-se, acessar por 'app.db' é diferente de URL, como é por DB vai direot pro banco pelo knex
  await app.db('transactions').del();
  await app.db('transfers').del();
  await app.db('accounts').del();
  return app.db('accounts').insert([
    { name: 'Acc User #1', user_id: user.id },
    { name: 'Acc User #2', user_id: user2.id },
  ]).then( () => request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
  .then( res => {
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Acc User #1');
  }));
});


test('Deve inserir uma conta com sucesso', () => {
  // const account = {
  //   name: 'Acc #1',
  //   user_id: user.id
  // };
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1'})
    .set('authorization', `bearer ${user.token}`)
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Acc #1');
    })
})

/* Aqui eu vou primeiro inserir uma conta e depois vou listala
Há 3 consultas: 
	1. A de get User do beforeAll
	2.  A inserção crua de  uma conta
		app.db('accounts').insert(account)
	3. Get All Contas
		request(app).get(MAIN_ROUTE)

*/

// Nâo existe mais pois agora as contas sâo individuais ************
// test.skip('Deve listar todas as contas', () => {
//   const account = {
//     name: 'Acc to list',
//     user_id: user.id
//   };
//   // Vai inserir uma conta e depois (no then) pegar todas as contas
//   return app.db('accounts')
//     .insert(account)
//     .then(() => request(app).get(MAIN_ROUTE).set('authorization', `bearer ${user.token}`) )
//     .then(res => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     })
// })

test('Deve retornar uma conta por Id', () => {
	return app.db('accounts')
		.insert({ name: 'Acc by Id', user_id: user.id }, ['id'])
		.then( acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`))
			.then((res) => {
	          expect(res.status).toBe(200);
	          expect(res.body.name).toBe('Acc by Id');
	          expect(res.body.user_id).toBe(user.id);
	        })
});

test('Must update an Account.', () => {
  return app.db('accounts')
    .insert({ name: 'Account to update', user_id: user.id }, ['id'])
    .then((acc) => {
      request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .send({ name: 'Account updated' })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe('Account updated');
        });
    });
});

test('Must delete an Acount.', () => {
  return app.db('accounts')
    .insert({ name: 'Account to deleted', user_id: user.id }, ['id'])
    .then((acc) => {
      request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then((res) => {
          expect(res.status).toBe(204);
        });
    });
});

test('Must not insert an account wihtout name.', () => {
  return request(app).post(`${MAIN_ROUTE}`)
    // .send({ user_id: user.id })
    .set('authorization', `bearer ${user.token}`)
    .catch((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório.');
    });
});

test("Não deve inserir uma conta  de nome duplicada para o mesmo usuário", () => {
  return app.db('accounts').insert({name: 'Acc Duplicada', user_id: user.id })
    .then( () => request(app).post(MAIN_ROUTE)
      .set('authorization', `bearer ${user.token}`)
      .send({ name: 'Acc Duplicada' }))
    .then( (res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe conta com esse nome');
    });
});

test('Não deve retornar uma conta de outro usuário', () => {
  return app.db('accounts')
    .insert({ name: 'Acc User #2', user_id: user2.id }, ['id'])
    .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)
      .set('authorization', `bearer ${user.token}`))
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Este recurso não pertence ao usuário")
      });
    
});

test('Não deve atualizar uma conta de outro usuário', () => {
  return app.db('accounts')
    .insert({ name: 'Acc User #2', user_id: user2.id }, ['id'])
    .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Acc para atualizar' })
      .set('authorization', `bearer ${user.token}`))
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Este recurso não pertence ao usuário")
      });
});


test('Não deve atualizar uma conta de outro usuário', () => {
  return app.db('accounts')
    .insert({ name: 'Acc User #2', user_id: user2.id }, ['id'])
    .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
      .set('authorization', `bearer ${user.token}`))
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Este recurso não pertence ao usuário")
      });
});