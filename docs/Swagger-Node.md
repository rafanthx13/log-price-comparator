# Como fazer Swagger para express.js

## Links

+ [Exemplo de uso no Express ](https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b)

+ [Editor online do arquivo de config do Swagger](http://editor.swagger.io/)
  - Editor de YAML/JSON que gera automaticamente a página Swagger. Use-o de prefereĉnai apra criar o doc do Swagger

+ [Official Doc de `swagger-ui-express`](https://www.npmjs.com/package/swagger-ui-express)

+ [How make Swagger.config file](https://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/)

### YAML

YAML é um acrónimo que significa "YAML Ain't Markup Language" (em português, "YAML não é linguagem de marcação") é um formato de codificação de dados legíveis por humanos.

O YAML foi feito essencialmente, para guardar dados (assim como os bancos de dados).

Em relação ao XML e JSON a legibilidade é muito mais fácil e você escreve mais facilmente. Além disso, ele é muito bem documentado e possui diversas bibliotecas.

### Como configurar

**Instalar swagger-ui-express**
````
npm i swagger-ui-express -S
````

**No arquivo com o express chamlo**
````
const swaggerUi = require('swagger-ui-express');

````
Se o Arquivo for YAML, é necessário de um paraser para o json 

````
npm install --save yamljs
````

**Apos isso, chame-o para converter de YAML -> JSON**
````
const YAML = require('yamljs'); // Convert YAML to JSON
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

````
Se for só um json
````
const swaggerDocument = require('./swagger.json');
````

**Insira na API**

````
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
````

## Exemplo de Arquivo `Swagger.yaml`

````yaml
swagger: '2.0'

info:
  description: This is a sample server Petstore server.
  version: 1.0.0
  title: Swagger LogApp
  contact:
    name: Rafael Morais de Assis
    url: https://rafanthx13.github.io/
    email: rafaassis15@gmail.com
  license:
    name: Apache 2.0
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'

schemes:
  - http
host: localhost:3000
basePath: /

paths:
  /city:
    get:
      summary: Pegar Cidades
      description: Retorna uma lista das cidades cadastradas
      responses:
        200:
          description: Uma lista de cidades
          schema:
            type: array
            items:
              required:
                - username
              properties:
                firstName:
                  type: string
                lastName:
                  type: string
                username:
                  type: string
````