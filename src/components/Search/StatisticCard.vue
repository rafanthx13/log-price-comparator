<template>
  <div class="">

    <!-- Card -->
    <v-card name="form-district" class="pb-7" elevation="6">

      <!-- Card Title -->
      <v-card-title style="display: inline-block;">
        <span class="headline mb-0 title-form"> Estatística Gerais</span>
      </v-card-title>

      <!-- Card Text -->
      <v-card-text primary-title class="caption" style="justify-content:center">

        <ul style="list-style: none;">
          <li>
            <span class="font-weight-bold title"> Max </span>
            <span class="font-weight-thin headline"> {{ this.maxPrice }} </span>
          </li>
          <li>
            <span class="font-weight-bold title"> Min </span>
            <span class="font-weight-thin headline"> {{ this.minPrice }} </span>
          </li>
          <li>
            <span class="font-weight-bold title"> Média </span>
            <span class="font-weight-thin headline"> {{ this.averagePrice }} </span>
          </li>
          <li>
            <span class="font-weight-bold title"> Desvio </span>
            <span class="font-weight-thin headline"> {{ this.standDeviationPrice }} </span>
          </li>
        </ul>
        
      </v-card-text>

    </v-card>

  </div>
</template>

<script>

export default {

  props: {
    mylogs: {
      type:  Array,
      default: () => []
    },
  },

  computed: {

    groupBy(){
      return this.groupByShop(this.mylogs)
    },

    oneArray(){
      return this.groupBy ? this.getOneArrayOfPrice(this.groupBy) : ''
    },

    maxPrice(){
      return this.oneArray ? this.maskMoney(Math.max.apply(Math, this.oneArray)) : ''
    },

    minPrice(){
      return this.oneArray ? this.maskMoney(Math.min.apply(Math, this.oneArray)) : ''
    },

    averagePrice(){
      if(this.oneArray){
        let average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
        return this.maskMoney(average(this.oneArray))
      } else {
        return ''
      }
    },

    standDeviationPrice(){
      if(this.oneArray && this.oneArray.length > 1){
        let getSD = function (data) {
          let average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
          let m = average(data);
          return Math.sqrt(data.reduce(function (sq, n) {
              return sq + Math.pow(n - m, 2);
          }, 0) / (data.length - 1));
        };
        let standD =  getSD(this.oneArray)
        return Math.round(standD * 100) / 100 // arredondar 2 casa
      } else {
        return '0'
      }
    },

  },

  methods:{

    getOneArrayOfPrice(logs){
      let aList = []
      for(let index in logs){
        for(let i in logs[index]){
          aList.push(logs[index][i].price)
        }
      }
      return aList
    },

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

    maskMoney(price){
      let currency = price.toFixed(2).split('.');
      currency[0] = "R$ " + currency[0].split(/(?=(?:...)*$)/).join('.');
      return currency.join(',');
    },

  },

}

</script>

<style lang="scss" scoped>

</style>
