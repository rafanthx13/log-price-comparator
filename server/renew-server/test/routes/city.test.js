const request = require('supertest');

const app = require('../../src/app');

test('Should list all cities', () => {
  return request(app).get('/city')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});
