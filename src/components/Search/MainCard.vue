<template>
  <div class="">

    <v-card name="form-district" class="pb-7" elevation="6">

      <!-- Card Title -->
      <v-card-title style="display: inline-block;">
        <span class="headline mb-0 title-form">{{ product }} em {{ city }}</span>
      </v-card-title>

      <!-- Card Text -->
      <v-card-text primary-title style="justify-content:center">
        <div class="row">
          <p style="padding-left: 12px;">Melhor Preço por Loja</p>
          <div class="col-md-12" v-if="this.dataInfo.length">
            <ul>
              <li v-for="item in orderBy" v-bind:key="item.shop">
                {{ item.ranking }} - {{ item.price }} de {{ item.shop }} {{ item.date }}
              </li>
            </ul>
          </div>
        </div>
      </v-card-text>

    </v-card>

  </div>
</template>

<script>

import moment from 'moment'

export default {

  props: {
    product: {
      type: String,
      default: 'Leite'
    },
    city: {
      type: String,
      default: 'UDI'
    },
    mainLogs: {
      type:  Array,
      default: () => []
    }
  },

  data () {
    return {
      dataInfo: {
        length : 99,
        minToSplit: 3,
        isEven: false
      },
    };
  },

  computed: {
    logs() {
      return JSON.parse(JSON.stringify(this.mainLogs));
    },
    groupBy() {
      return this.logs ? this.groupByShop(this.logs) : []
    },
    minpp() {
      return this.groupBy ? this.minPrices(this.groupBy) : []
    },
    orderBy() {
      return this.minpp ? this.orderByPriceJSONsAsc(this.minpp) : []
    },
  },

  methods:{

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

    minPrices(logs){
      let aObject = {}
      for (let [key, array_value] of Object.entries(logs)){
        aObject[key] = array_value.reduce( (prev, current) => 
          prev.price < current.price ? prev : current
        );
      }
      return aObject
    },

    orderByPriceJSONsAsc(logs){
      let aList = Object.values(logs)

      function compareByPrice(a, b) {
        const a_price = a.price;
        const b_price = b.price;
        let comparison = 0;
        if (a_price > b_price) {
          comparison = 1;
        } else if (a_price < b_price) {
          comparison = -1;
        }
        return comparison;
      }

      this.dataInfo.length = aList.length
      this.dataInfo.isEven = aList.length % 2 == 0
      // Ordena por preço
      aList.sort(compareByPrice)
      // Insere o ranking começando por 1
      aList.forEach( (el, index, array) => {
        array[index].ranking = index + 1
      });

      // console.log("aList", aList)

      return aList.map( item => {
        // Não sei porque mas o 'diff' so funciona corretamente assim
        // se voce dar um 'toString' vai quebrar tudo
        item.date = moment().diff(moment(item.date), 'days')
        item.date = item.date == 0 ? 'Hoje' : 'a ' + item.date + ' dias'
        item.price = this.maskMoney(item.price)
        return item
      })

    },

    maskMoney(price){
      let currency = price.toFixed(2).split('.');
      currency[0] = "R$ " + currency[0].split(/(?=(?:...)*$)/).join('.');
      return currency.join(',');
    },

    round_two(price){
      return Math.round(price * 100) / 100 // arredondar 2 casa
    },


  },

}

</script>

<style lang="scss" scoped>

ul {
  list-style: none;
  padding-left: 0;
}

</style>
