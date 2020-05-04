// Como tudo começa dedaqui, tudo vai ser apartir da entrada em src
const { PORT } = require("./src/env/env.config.js")

const app = require('./src/app');

app.listen(PORT, () => {
	console.log(`App Listening on Port: ${PORT}.`)
});

/* Status Server Status

| Verbo  | Sucesso          | Falha             |
| ------ | ---------------- | ----------------- |
| POST   | 201 (CREATED)    | 400 (BAD CONTENT) |
| GET    | 200 (OK)         | 404 (NOT FOUND)   |
| DELETE | 204 (NO CONTENT) | 400 / 404         |
| PUT    | 200 (OK) / 201   | 400 / 404         |


200 Ok: Para GET/PUT e outro HTTP métodos menores, quer dizer que deu tudo bem
201 Created: POST Criou algo no banco
204 No Content: Para Delete, quer dizer que não volta nada
400 Bad Request: E, geral, sintax mal formada, coisas de validação
401 Unauthorized : Falha na autenticação (ex: sem token)
403 Forbidden : Tem autenticaçâo masnâo para esse erviço em especicfico (ex: admin)
404 Not Found: Em geral para Get. O recurso em especifico nâo foi encontrado
409 Conflict: Erro de duplicata ou conflito de dados no banco
500 Internal Server Error: QUalquer outro eror bizzarro nâo mapeado
*/