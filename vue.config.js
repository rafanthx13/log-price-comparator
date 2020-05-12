//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

/*
 // "configureWebpack": {
   // plugins: [new BundleAnalyzerPlugin(), 
/*new VuetifyLoaderPlugin({
	match (originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
          }
        }
})
],
// Reduz em metade o gasto com moment
	resolve: {
	  alias: {
		moment: 'moment/src/moment'
	  }
	}
  },
*/
}
