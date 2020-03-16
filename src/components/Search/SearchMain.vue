<template>
  <div style="width: 80%">
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

    <div v-if="this.logs">

      <!-- CardsComponents -->
      <v-container>
        <div class="row">
          <!-- MainCard Component  -->
          <div class="col-md-8">
            <MainCard :city="this.formSend.city" :product="this.formSend.product" :mainLogs="this.logs"></MainCard>
          </div>
          <!-- StatisticCard Component  -->
          <div class="col-md-4">
            <StatisticCard :mylogs="this.logs"></StatisticCard>
          </div>
        </div>
      </v-container>

      <!-- Charts Container -->
      <v-container v-for="(value, key) in this.logsByShop" v-bind:key="key">
        <div class="border-2 rounded-lg py-4 px-1 shadow-lg mb-8">
          <h1 class="text-xl font-semibold">{{ key }}</h1>
          <apexchart height="200" type="line" :options="value.chartOptions" :series="value.series_price"/>
        </div>
      </v-container>

    </div>

    <!-- Missing Content Card -->
    <div v-if="!this.logs && this.submittedFlag">
      <v-container>
         <v-card name="form-district" class="pb-7" elevation="6">
          <v-card-title style="text-align: center; display: block;">
            <span class="headline mb-0 title-form">Sem dados para <br> {{ this.logData.product }} em {{ this.logData.city }}</span>
          </v-card-title>
        </v-card>
      </v-container>
    </div>

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
  message: 'O nome do campo não pode ser maior que {length} characteres',
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
      // DropDown Items from API
      formItems: {
        city: null,
        product: null,
      },
      // Item Chosed
      logData: {
        city: '',
        product: '',
      },
      // Valores enviados para MainCard apenas no submit
      formSend: {
        city: '',
        product: '',
      },
      // When show Missing Card
      submittedFlag: false,
      // O v-mask nao permite alterar o elemetno mascarado, entao,
      // deixamos separado e depois na hora de enviar converte para o logData.price
      // money: '',
      myMaskMoney: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      // logs com JSON dos registros, agrupamdos por groupByShop
      logs: null,
    }
  },

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

          // Gerar opções de gráfico para cada loja
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
            colors: [this.randomRGB()],
            grid: {
              borderColor: '#e7e7e7', // '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns, '#f3f3f3'
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

    },

  },

  watch: {

    'logData.city': function(){
      if(this.logData.city){
        Product.getProductsNames().then(result => {
          if(result){
            let ProductsNameList = this.getListOne('name', result.data)
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
    },

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
          if (result) {
            Log.getPosted(this.logData).then(result => {
                this.logs = result.data.length == 0 ? null : result.data
                // O resultado, mesmo que seja um array vazio, nâo é 
                // um array comun, é um array com prpriedades de JS difenrete
                // Então, use o criterio de lenght pra saber se deu certo ou não
                this.formSend.product = this.logData.product.valueOf()
                this.formSend.city = this.logData.city.valueOf()
                this.submittedFlag = true
              })
              .catch(err => {
                console.log(err)
                this.submittedFlag = true
              })
          } else {
            console.log("fail")
            this.submittedFlag = true
          }
        })
        .catch((err) => {
          console.log("Error")
          console.log(err)
          this.submittedFlag = true
        });
    },

    // limpa forumlario
    clear() {
      this.logData.city = null
      this.logData.shop = null
      this.logData.product = null
      this.$refs.observer.reset()
      this.logs = null
      this.submittedFlag = false
    },

    // Pega um array de Um mesmo Ojeto JSON e retorno só os elementos
    getListOne(attr, json_list){
      let aList = []
      for (let obj in json_list){
        aList.push(json_list[obj][attr])
      }
      return aList
    },

    // formata dinheiro
    formatMoneyToSend(maskedMoney){
      let x = parseFloat(maskedMoney.slice(3).replace(".","").replace(",","."))
      return x
    },

    // Cria um dicionario cuja key: loja, values["logs"]: seus registros
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

    // Gerar cores dos gráficos
    randomRGB(){
      let letters = "0123456789ABCDEF"
      let color = '#'
      for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
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