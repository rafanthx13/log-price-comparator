const request = require('supertest');

const app = require('../src/app');

test('Deve respnder na porta 3001', () => {
  return request(app).get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    });
});
