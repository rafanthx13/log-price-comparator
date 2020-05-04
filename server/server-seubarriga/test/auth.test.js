const request = require('supertest');
const app = require('../src/app');

test('Must receive a token once logged.', () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user.save({ name: 'Walter White', mail, password: '123456' })
    .then(() => {
      request(app).post('/auth/signin')
        .send({ mail, password: '123456' })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty('token');
        });
    });
});

test('Must not login using a wrong password.', () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user.save({ name: 'Walter', mail, password: '123456' })
    .then(() => {
      request(app).post('/auth/signin')
        .send({ mail, password: '654321' }) // email diferente
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.error).toBe('User or password invalid.');
        });
    });
});

test('Must not login using user and wrong password.', () => {
  return request(app).post('/auth/signin')
    .send({ mail: 'mywroguser@mail.com', password: 'wrongpass' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('User or password invalid.');
    });
});

// O MAIS IMPORTANTE
// PELO TDD VAI OBRIGAR A TER SEGURANÇA NAS ROTAS
test('Must not access a protected route without a token.', () => {
  return request(app).get('/v1/users')
    .then((res) => {
      // Alguem que esta autenticado tentando acessar recursos
      expect(res.status).toBe(401);
    });
});

// Uma rota que nâo precisa de token
test('Users must be created using singnup route.', () => {
  return request(app).post('/auth/signup')
    .send({ name: 'Walter White', mail: `${Date.now()}@mail.com`, password: '123456' })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty('mail');
      expect(result.body).not.toHaveProperty('passoword');
    });
});
