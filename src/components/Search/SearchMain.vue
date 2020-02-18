<template>
  <div>
    <h1>SEARCH MAIN 2</h1>

    <!-- Form Container  . -->
    <v-container fluid style="text-align:center">
      <ValidationObserver ref="observer" v-slot="{ validate, handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">

          <!-- Form Card  -->
          <v-card name="form-district" class="pb-7" elevation="6">

            <!-- Card Title -->
            <v-card-title style="display: inline-block;">
              <v-icon>mdi-city</v-icon>
              <span class="headline mb-0 title-form">Insira os dados do Produto</span>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center">
              <v-row>
                <ValidationProvider v-slot="{ errors }" name="city" rules="required">
                  <v-select class="form-item" :items="items.city" v-model="logData.city" label="Cidade" :error-messages="errors" outlined required></v-select>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="shop" rules="required">
                  <v-select class="form-item" :items="items.shop" v-model="logData.shop" label="Loja" :error-messages="errors" outlined required></v-select>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="product" rules="required">
                  <v-select class="form-item" :items="items.product" v-model="logData.product" label="Produto" :error-messages="errors" outlined required></v-select>
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
      <!-- MainCard Component  -->
      <div class="row">

        <div class="col-md-8">

          <!-- <v-card name="form-district" class="pb-7" elevation="6">
            <v-card-title style="display: inline-block;">
              <span class="headline mb-0 title-form">TITULO</span>
            </v-card-title>
          </v-card> -->

          <MainCard :city="this.logData.city" :product="this.logData.product" :logs="this.logs"></MainCard>

        </div>


        <!-- StatisticCard Component  -->
        <div class="col-md-4">

          <!-- <v-card name="form-district" class="pb-7" elevation="6">
            <v-card-title style="display: inline-block;">
              <span class="headline mb-0 title-form">TITULO</span>
            </v-card-title>
          </v-card> -->

          <StatisticCard :mylogs="JSON.parse(JSON.stringify(this.logs))"></StatisticCard>

        </div>
    </div>
    </v-container>

    <v-container>
      <div class="component-wrapper">
        <GChart
         type="LineChart"
         :data="chartData"
         :options="chartOptions"
        />
      </div>
    </v-container>

    <v-container>
      <div class="row">
        <!-- ChartCard  -->
        <div class="col-md-6">
          <v-card name="form-district" class="pb-7" elevation="6">
            <v-card-title style="display: inline-block;">
              <span class="headline mb-0 title-form">TITULO GRÁFICO</span>
            </v-card-title>
            <v-card-text primary-title style="justify-content:center">
              <div class="row">
                <div class="col-md-4">
                  ESTATÍSTICAS
                </div>
                <div class="col-md-8">
                  GRÁFICO
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- ChartCard  -->
        <div class="col-md-6">
          <v-card name="form-district" class="pb-7" elevation="6">
            <v-card-title style="display: inline-block;">
              <span class="headline mb-0 title-form">TITULO GRÁFICO</span>
            </v-card-title>
            <v-card-text primary-title style="justify-content:center">
              <div class="row">
                <div class="col-md-4">
                  ESTATÍSTICAS
                </div>
                <div class="col-md-8">
                  GRÁFICO
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

      </div>

      <div class="border-2 rounded-lg py-4 px-1 shadow-lg mb-8">
          <h1 class="text-xl font-semibold">Basic Chart</h1>
          <apexchart height="200" type="line" :options="chartOptionsRe" :series="series"/>
        </div>

    </v-container>

  </div>
</template>

<script>

  import {
    required,
    max
  } from 'vee-validate/dist/rules'

  import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
  } from 'vee-validate'

  import Log from '../../api/Log'
  import City from '../../api/City'
  import Shop from '../../api/Shop'
  import Product from '../../api/Product'

  import {VMoney} from 'v-money'
  import moment from 'moment'
  import { GChart } from 'vue-google-charts'

  import MainCard from './MainCard'
  import StatisticCard from './StatisticCard'

  // import VueApexCharts from "vue-apexcharts";

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
      GChart,
      MainCard,
      StatisticCard,
      // VueApexCharts
    },

    directives: {money: VMoney},

    data() {
      return {
        items: {
          city: ['Uberlândia'],
          shop: this.getShops,
          product: this.getProducts,
        },
        logData: {
          city: '',
          shop: '',
          product: '',
          price: '',
          date: '',
        },
        valid: true,
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
        chartData: [
        ['Gün', 'Harcama', 'Expenses', 'Profit'],
        ['2020-02-15 14:30:02', 1000, 400, 200],
        ['2020-02-16 14:30:02', 1170, 400, 200],
        ['2020-02-17 14:30:02', 660, 1120, 300],
        ['2020-02-118 14:30:02', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      },
        logs: [
        {"log_id":1,"product":"Leite","price":3,"shop":"loja-test","city":"Uberlândia","date":null},
        {"log_id":2,"product":"Leite","price":5.55,"shop":"loja-test","city":"Uberlândia","date":"2020-02-15 12:09:15"},
        {"log_id":3,"product":"Ovo","  price":30,"shop":"loja-test","city":"Uberlândia","date":"2020-02-15 14:30:02"},
        {"log_id":5,"product":"Leite","price":3,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-17"},
        {"log_id":6,"product":"Leite","price":5.5,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-16"},
        {"log_id":7,"product":"Leite","price":3.12,"shop":"SmartMinas","city":"Uberlândia","date":"2020-02-15"},
        {"log_id":8,"product":"Leite","price":3.14,"shop":"Mercadinho","city":"Uberlândia","date":"2020-02-14"},
        {"log_id":9,"product":"Leite","price":3.89,"shop":"Mercadinho","city":"Uberlândia","date":"2020-02-13"},
        {"log_id":10,"product":"Leite","price":2.5,"shop":"Carrefour","city":"Uberlândia","date":"2020-02-17"},
        {"log_id":11,"product":"Leite","price":3.02,"shop":"Carrefour","city":"Uberlândia","date":"2020-02-16"}
      ],
      chartOptionsRe: {
        xaxis: {
          type: "datetime",
          categories: [
            "2020-02-17 14:30:02",
            "2020-02-16 14:30:02",
            "2020-02-15 14:30:02",
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
              enabled: false,
            },
            stroke: {
              curve: 'straight'
            },
      },
      series: [
        {
          name: "WebsiteHits",
          data: [3, 5.5, 3.12]
        }
      ]
      
      }
    },

  watch: {
    'logData.city': function () {
      if(this.logData.city){
        Shop.getShopsByCity(this.logData.city).then(result => {
          if(result){
            let ShopsNamesList = this.getListOne('name', result.data)
            console.log(ShopsNamesList)
            this.items.shop = ShopsNamesList
          } else {
            console.log("fail 441")
             this.logData.shop = []
          }
        })
        .catch(err => {
          console.log(err)
          console.log("fail 331")
          this.logData.shop = []
        })
      } else {
        this.items.shop = []
      }
    },
    'logData.shop': function(){
      if(this.logData.shop){
        Product.getProductsNames().then(result => {
          if(result){
            let ProductsNameList = this.getListOne('name', result.data)
            console.log(ProductsNameList)
            this.items.product = ProductsNameList
          } else {
            console.log("fail 444")
            this.items.product = []
          }
        })
        .catch(err => {
          console.log(err)
          console.log("fail 334")
          this.items.product = []
        })
      } else{
        this.items.product = []
      }
    }
  },

    created(){

      City.getCities()
        .then(result => {
          if(result){
            this.items.city = this.getListOne('city', result.data)
            // console.log(this.getListOne('city', result.data))
          } else {
            console.log("fail 442")
          }
        })
        .catch(err => {
          console.log(err)
          console.log("fail 332")
        })

    },

    methods: {

      submit() {
        // Metodo do componente que retorna um Promisse que
        // tem como retorno 'resul' :: Boolean da validação
        this.$refs.observer.validate()
          .then(result => {
            this.logData.date = moment().format("YYYY-MM-DD HH:mm:ss")
            this.logData.price = this.formatMoneyToSend(this.money)
            console.log(this.logData)
            if (result) {
              Log.post(this.logData).then(result => {
                  console.log(result.data)
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
        this.district.city = ''
        this.district.state = ''
        this.district.country = null
        this.$refs.observer.reset()
      },

      onSubmit() {
        alert('Form has been submitted!');
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
             aDict[aShop] = []
           }
           aDict[aShop].push(logs[index])
         }
         return aDict
       },


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
</style>
