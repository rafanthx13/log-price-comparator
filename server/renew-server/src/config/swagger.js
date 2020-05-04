const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Convert YAML to JSON
const swaggerDocument = YAML.load('src/env/swagger.yaml');

module.exports = app => {

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}