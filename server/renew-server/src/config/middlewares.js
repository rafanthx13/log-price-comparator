const bodyparser = require('body-parser');
const cors = require('cors');

// Use isso para tirar o swagger quando for fazer testes
// function areWeTestingWithJest() {
//     return process.env.JEST_WORKER_ID !== undefined;
// }
// console.log("===>", areWeTestingWithJest())

module.exports = (app) => {
  app.use(bodyparser.json());
  app.use(cors());
};
