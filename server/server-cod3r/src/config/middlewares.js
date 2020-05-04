const bodyParser = require('body-parser') // Conveter os JSON/XML quando chegar a requisição
const cors = require('cors') // Para poder acessar de outra aplicação

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}