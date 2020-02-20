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
        
        <!-- {{ this.oneArray }} -->

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

  // data(){
  //   return {
  //     groupBy: ,
  //     // oneArray: this.getOneArrayOfPrice(this.groupBy)
  //   }
  // },

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
        return this.round_two(standD)
      } else {
        return ''
      }
    },

  },

  methods:{

    getOneArrayOfPrice(logs){
      let aList = []
      // console.log(logs);
      for(let index in logs){
        // console.log(index)
        // console.log(logs[index])
        for(let i in logs[index]){
          aList.push(logs[index][i].price)
        }
        // aList.push(logs[index].price)
      }
      return aList
    },

    groupByShop(logs){
      // Recebe todos os logs e agrupa num obj com cada chave uma loja
      // console.log(logs);
      let aDict = {}
      for( let index in logs ){
        let aShop = logs[index].shop
        // console.log(aShop, "---")
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

    round_two(price){
      return Math.round(price * 100) / 100 // arredondar 2 casa
    },

  },

}

</script>

<style lang="scss" scoped>

</style>
