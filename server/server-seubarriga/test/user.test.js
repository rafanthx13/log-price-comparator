const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../src/app');

const random_mail = `${Date.now()}@xagmail.com`;

const MAIN_ROUTE = '/v1/users';

let user;

// Vou salvar um user e gerar um token valido
beforeAll(async () => {
  const res = await app.services.user.save(
    { name: 'Water White', mail: random_mail, password: '123456' }
  );
  user = { ...res[0] };
  // gero diretamente o token
  user.token = jwt.encode(user, 'Segredo!');
});

test('Deve listar todos os usuários', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

// uso o diff apra ficar com email diferente do do "beforeAll"
test('Deve inserir usuário com sucesso', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Walter Mitty', mail: random_mail + 'diff', password: '123456' })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Walter Mitty');
    });
});

// 1 FORMA: PROMISSE - THEN
// nao posso esquecer de retornar o return
// é mais preferível dessa forma
test('Não deve inserir usuário sem nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ mail: 'walterxx@gmail.com', password: '123456'})
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      // console.log(res.error);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório')
    })
});

// Esse test é igual ao anterior, mas vamos fazelo
// de forma difenrete pra aprender a fazer de outras formas
// 2 FORMA - Com Async Await
test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post(MAIN_ROUTE)
    .send({name: 'Walter Mitty', password: '123456'})
    .set('authorization', `bearer ${user.token}`);
  // console.log(result.error);
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório')
});


// 3 FORMA - com Done
// done, é o final que serve pra decidir que chegou ao fim
// posso colocar done.fail() indicando que falhou obrigatoriamente
// nao posso esquecer de colaor o done
test('Não deve inserir usuário sem senha', (done) => {
  request(app).post(MAIN_ROUTE)
    .send({ name: 'Walter Mitty', mail: 'walterxx@gmail.com'})
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      // console.log(res.error);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório')
      done();
    }).catch(err => done.fail(err));
});

// ta dando erro  nao sei porque
test('Não Deve inserir usuário com mesmo email', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Walter Mitty', mail: random_mail + 'diff', password: '123456' })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      // console.log(res.error);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('This email already exists in the database.');
    });
});

test('Shall insert the user with password encrypted.', async () => {
  const res = await request(app).post(MAIN_ROUTE)
    .send({ name: 'Walter White', mail: `${Date.now()}@mail.com`, password: '123456' })
    .set('authorization', `bearer ${user.token}`);

    // .set('authorization', `bearer ${user.token}`);
  // console.log(res.error);
  expect(res.status).toBe(201);
  const { id } = res.body;
  const userDb = await app.services.user.findOne({ id });
  expect(userDb.password).not.toBeUndefined();
  expect(userDb.password).not.toBe('123456');
});