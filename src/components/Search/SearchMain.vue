<template>
  <div>
    <h1>Search Logs</h1>

    <!-- Form Container  . -->
    <v-container fluid style="text-align:center">
      <ValidationObserver ref="observer">
        <form>
          <v-card name="form-district" class="pb-7" elevation="6">

            <!-- Card Title -->
            <v-card-title style="display: inline-block;">
              <v-icon>mdi-magnify</v-icon>
              <span class="headline mb-0 title-form">Insira os dados para Pesquisar por um produto</span>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center; padding-bottom: 0;">
              <v-row style="display: inline-flex;">
                <ValidationProvider v-slot="{ errors }" name="city" rules="required">
                  <v-select class="form-item" :items="formItems.city" v-model="logData.city" label="Cidade" :error-messages="errors" outlined required></v-select>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="product" rules="required">
                  <v-select class="form-item" :items="formItems.product" v-model="logData.product" label="Produto" :error-messages="errors" outlined required></v-select>
                </ValidationProvider>
                <v-btn class="my-3 mr-3" @click="submit">Pesquisar</v-btn>
                <v-btn class="my-3 mr-3" @click="clear">Limpar</v-btn>
              </v-row>
            </v-card-text>

          </v-card>

        </form>
      </ValidationObserver>
    </v-container>

    <v-container>
      
      <div class="row">

        <!-- MainCard Component  -->
        <div class="col-md-8">
          <MainCard :city="this.logData.city" :product="this.logData.product" :mainLogs="this.logs"></MainCard>
        </div>


        <!-- StatisticCard Component  -->
        <div class="col-md-4">
          <StatisticCard :mylogs="this.cloneJSON(this.logs)"></StatisticCard>
        </div>
    </div>
    </v-container>

    <v-container v-for="(value, key) in this.logsByShop" v-bind:key="key">
      <div class="border-2 rounded-lg py-4 px-1 shadow-lg mb-8">
        <h1 class="text-xl font-semibold">{{ key }}</h1>
        <apexchart height="200" type="line" :options="value.chartOptions" :series="value.series_price"/>
      </div>
    </v-container>

  </div>
</template>

<script>

  import { required, max } from 'vee-validate/dist/rules'

  import { extend, ValidationObserver,
    ValidationProvider, setInteractionMode } from 'vee-validate'

  import Log from '../../api/Log'
  import City from '../../api/City'
  import Product from '../../api/Product'

  import {VMoney} from 'v-money'
  import moment from 'moment'

  import MainCard from './MainCard'
  import StatisticCard from './StatisticCard'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: 'É necessário inserir dados nesse campo',
  })

  extend('max', {
    ...max,
    message: 'The name field may not be greater than {length} characters',
  })

  export default {

    components: {
      ValidationProvider,
      ValidationObserver,
      MainCard,
      StatisticCard,
    },

    directives: { money: VMoney },

    data() {
      return {
        formItems: {
          city: ['Uberlândia'],
          shop: this.getShops,
          product: this.getProducts,
        },
        logData: {
          city: '',
          // shop: '',
          product: '',
        },

        // O v-mask nao permite alterar o elemetno mascarado, entao,
        // deixamos separado e depois na hora de enviar converte para o logData.price
        money: '',
        myMaskMoney: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false
        },

        logs: [
          {"log_id":1,"product":"Leite" ,"price":3   ,"shop":"loja-test" ,"city":"Uberlândia","date":"2020-02-13"},
          {"log_id":2,"product":"Leite" ,"price":5.55,"shop":"loja-test" ,"city":"Uberlândia","date":"2020-02-15 12:09:15"},
          {"log_id":3,"product":"Ovo"   ,"price":30  ,"shop":"loja-test" ,"city":"Uberlândia","date":"2020-02-15 14:30:02"},
          {"log_id":5,"product":"Leite" ,"price":3   ,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-17"},
          {"log_id":6,"product":"Leite" ,"price":5.5 ,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-16"},
          {"log_id":7,"product":"Leite" ,"price":3.12,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-15"},
          {"log_id":8,"product":"Leite" ,"price":3.14,"shop":"Mercadinho","city":"Uberlândia","date":"2020-02-14"},
          {"log_id":9,"product":"Leite" ,"price":3.89,"shop":"Mercadinho","city":"Uberlândia","date":"2020-02-13"},
          {"log_id":10,"product":"Leite","price":2.5 ,"shop":"Carrefour" ,"city":"Uberlândia","date":"2020-02-17"},
          {"log_id":11,"product":"Leite","price":3.02,"shop":"Carrefour" ,"city":"Uberlândia","date":"2020-02-16"},
          {"log_id":12,"product":"Leite" ,"price":2.12,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-10"},
        ],

        chartOptionsRe: {
          xaxis: {
            type: "datetime",
            categories: [
              "2020-02-17 14:30:02",
              "2020-02-16 14:30:02",
              "2020-02-15 14:30:02",
              "2020-02-10 14:30:02",
            ]
          },
          title: {
            text: 'Average High & Low Temperature',
            align: 'left'
          },
          markers: {
            size: 1
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },
        },

        series: [{
          name: "WebsiteHits",
          data: [3, 5.5, 3.12, 2.80]
        }],

        // logsByShop: {},


      }
    },

    // groupByShop

    computed: {

      logsByShop() {
        if(this.logs){
          let groupByShop = this.groupByShop(this.logs);

          for (let key of Object.keys(groupByShop)){

            let series_categories = groupByShop[key]["logs"].map(item => {
              return item.date
            })

            groupByShop[key]["key"] = key

            let series_price = groupByShop[key]["logs"].map(item => {
              return item.price
            })

            groupByShop[key]["chartOptions"] = {
              xaxis: {
                type: "datetime",
                categories: series_categories
              },
              title: {
                text: key,
                align: 'left'
              },
              markers: {
                size: 1
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: 'straight'
              },
            }

            groupByShop[key]["series_price"] = [{
              name: key,
              data: series_price
            }];

          }

          return groupByShop

        } else {
          return {}
        }
        // return JSON.parse(JSON.stringify(this.mainLogs));
      },

      groupBy() {
        return this.logs ? this.groupByShop(this.logs) : []
      },
    },

    watch: {

      'logData.city': function(){
        if(this.logData.city){
          Product.getProductsNames().then(result => {
            if(result){
              let ProductsNameList = this.getListOne('name', result.data)
              console.log(ProductsNameList)
              this.formItems.product = ProductsNameList
            } else {
              console.log("fail 444")
              this.formItems.product = []
            }
          })
          .catch(err => {
            console.log(err)
            console.log("fail 334")
            this.formItems.product = []
          })
        } else{
          this.formItems.product = []
        }
      }
    },

    created(){

      City.getCities().then(result => {
        if(result){
          this.formItems.city = this.getListOne('city', result.data)
          // console.log(this.getListOne('city', result.data))
        } else {
          console.log("fail 442")
        }
      }).catch(err => {
        console.log(err)
        console.log("fail 332")
      })

    },

    methods: {

      submit() {
        // Metodo do componente que retorna um Promisse que
        // tem como retorno 'result' :: Boolean da validação
        this.$refs.observer.validate()
          .then(result => {
            this.logData.date = moment().format("YYYY-MM-DD HH:mm:ss")
            console.log(this.logData)
            if (result) {
              Log.getPosted(this.logData).then(result => {
                  console.log(result.data)
                  this.logs = result.data
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              console.log("fail")
            }
          })
          .catch((err) => {
            console.log("Error")
            console.log(err)
          });
      },

      clear() {
        this.formItems.city = null
        this.formItems.shop = null
        this.formItems.product = null
        this.$refs.observer.reset()
      },

      // Pega um array de Um mesmo Ojeto JSON e retorno só os elementos
      getListOne(attr, json_list){
        let aList = []
        for (let obj in json_list){
          aList.push(json_list[obj][attr])
        }
        return aList
      },

      formatMoneyToSend(maskedMoney){
        console.log("antes", maskedMoney)
        let x = parseFloat(maskedMoney.slice(3).replace(".","").replace(",","."))
        console.log("depois", x)

          return x
       },

       /* Recebe todos os logs e agrupa num obj com
       cada chave uma loja console.log(logs); */
       groupByShop(logs){
         let aDict = {}
         for( let index in logs ){
           let aShop = logs[index].shop
           if(!aDict[aShop]){
             aDict[aShop] = {}
             aDict[aShop]["logs"] = []
           }
           aDict[aShop]["logs"].push(logs[index])
         }
         return aDict
       },

       cloneJSON(obj){
        return JSON.parse(JSON.stringify(obj))
       }

    },

  }

</script>

<style lang="scss" scoped>

.form-item {
  width: 150px;
  margin-right: 20px;
  margin-left: 20px;
}

.buttons-form {
  margin-top: 10px;
}

h1 {
  text-align: center;
}

</style>