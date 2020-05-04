const request = require('supertest');

const app = require('../../src/app');

test('Should responde in port 3000', () => {
  return request(app).get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    });
});