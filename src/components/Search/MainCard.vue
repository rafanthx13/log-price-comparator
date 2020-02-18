<template>
  <div class="">
    <v-card name="form-district" class="pb-7" elevation="6">
      <v-card-title style="display: inline-block;">
        <span class="headline mb-0 title-form">{{ product }} LEITE em UBERLANDIA {{ city }}</span>
      </v-card-title>
      <v-card-text primary-title style="justify-content:center">
        <!-- <br><br> -->
        <!-- {{ groupBy }} -->
        <!-- <br><br> -->
        <!-- KKK {{ this.minprice }} -->
        <!-- <br><br> -->
        <!-- ==> {{ minpp }} -->
        <!-- <br><br> -->
        <!-- {{ orderBy }} Tem Array de JSON ordenado pelo menor preço -->

        <!-- {{dataInfo}} -->

        <div class="row">

          <div class="col-md-12" v-if="this.dataInfo.length <= this.dataInfo.minToSplit">
            <ul id="example-1">
              <li v-for="item in orderBy" v-bind:key="item.shop">
                {{ item.ranking }} - {{ item.price }} de {{ item.shop }} a {{ item.date }} dias
                <!-- a.diff(b, 'days') -->
              </li>
            </ul>
          </div>


            <div class="col-md-6" v-if="this.dataInfo.length > this.dataInfo.minToSplit">
              <ul id="example-1">
                <li v-for="item in orderBy.slice(0, this.splitnumber())" v-bind:key="item.shop">
                  {{ item.ranking }} - {{ item.price }} de {{ item.shop }} a {{ item.date }} dias
                  <!-- a.diff(b, 'days') -->
                </li>
              </ul>
            </div>

            <div class="col-md-6" v-if="this.dataInfo.length > this.dataInfo.minToSplit">
              <ul id="example-1">
                <li v-for="item in orderBy.slice( - this.splitnumber() )" v-bind:key="item.shop">
                  {{ item.ranking }} -{{ item.price }} de {{ item.shop }} a {{ item.date }} 
                  <!-- a.diff(b, 'days') -->
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
        default: ''
      },
      city: {
        type: String,
        default: ''
      },
      logs: {
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

        // function logArrayElements(element, index, array) {
        //     console.log("a[" + index + "] = " + element);
        // }

        
        aList.sort(compareByPrice)

        aList.forEach( (el, index, array) => {
          array[index].ranking = index + 1
        });


        return aList.map( item => {
          // Não sei porque mas o 'diff' so funciona corretamente assim
          // se voce dar um 'toString' vai quebrar tudo
          item.date = moment().diff(moment(item.date), 'days')
          item.price = this.maskMoney(item.price)
          console.log(item)

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

      // TODO: Tranformar essa função em um atributo, pois ela é 
      //chamada várias vezes, entâo é melhor já ter seu valor calculado
      splitnumber(){
        let l = this.dataInfo.length
        if(l <= this.dataInfo.minToSplit){
          return  l - 1
        } else {
          console.log("ceil len/2", Math.ceil(l/2))
          return Math.ceil(l/2)
        }
      }


    },

  }

</script>

<style lang="scss" scoped>

</style>
