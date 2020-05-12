
````javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "configureWebpack": {
    plugins: [new BundleAnalyzerPlugin()],
	resolve: {
	  alias: {
		moment: 'moment/src/moment'
	  }
	}
  },
}
````
## Tetar o que é executado do build

npm install -g serve
serve -s dist

na pasta que tem o /dist gerado pelo build

The default port is 5000, but can be adjusted using the -l or --listen flags:

serve -s build -l 4000

## Saber oq ue está ocupando muito espaço

Instalr essa build

`npm install --save-dev webpack-bundle-analyzer`

Ao fazer

`npm run build`

vai abrir automaticamente em `http://127.0.0.1:8888/`

Uma página apra listar as dependências/çencias e seus tamanhos


## Moment

O Moment pega vários lcoales, eu reduzi isso.

EU tirei os vários locals (que na maioria das vezes nâo deve precisar) e coloquei só o sr. Isso já reduziu umpouco

````javascript
module.exports = {

  "configureWebpack": {
	resolve: {
	  alias: {
		moment: 'moment/src/moment'
	  }
	}
  },
}
````
