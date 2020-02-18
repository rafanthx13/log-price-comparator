<template>
  <div>

    <h1 class="main-title">INSERT CITY</h1>

     <v-container fluid style="text-align:center">

      <v-card name="form-district" class="pb-7" elevation="6">
        <ValidationObserver ref="observer" v-slot="{ validate, handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">

            <!-- Card Title -->
            <v-card-title>
              <v-icon>mdi-city</v-icon>
              <span class="headline mb-0 title-form">Insira os dados da Cidade</span>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center">
              <ValidationProvider v-slot="{ errors }" name="city" rules="required">
                <v-select :items="items.city" v-model="logData.city" label="Cidade" :error-messages="errors" outlined required></v-select>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="shop" rules="required">
                <v-select :items="items.shop" v-model="logData.shop" label="Loja" :error-messages="errors" outlined required></v-select>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="product" rules="required">
                <v-select :items="items.product" v-model="logData.product" label="Produto" :error-messages="errors" outlined required></v-select>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="city" rules="required">
                <v-text-field label="Preço" v-model.lazy="money" :error-messages="errors" v-money="myMaskMoney" required></v-text-field>
              </ValidationProvider>
              
            </v-card-text>

            <!-- Card Buttons -->
            <v-card-actions style="display: inline-flex;">
              <v-btn class="mr-4" @click="submit">Enviar</v-btn>
              <v-btn @click="clear">Limpar</v-btn>
            </v-card-actions>

          </form>
        </ValidationObserver>
      </v-card>

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
    },

    directives: {money: VMoney},

    data() {
      return {
        district: {
          city: '',
          state: '',
          country: ''
        },
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
      }
    },

    /*
      computed: {
    returnProfiles() {
      return this.profiles;
    },
    corporateEmail() {
      if (this.model.username) {
        !this.model.domain
          ? (this.model.domain = "@neppoadm.com.br")
          : "@neppoadm.com.br";
        return this.model.username + this.model.domain;
      } else {
        return "";
      }
    }
  },
    */
   
  // computed: {
  //   getShops() {
  //     if(this.logData.city){
  //       Shop.getShopsNames().then(result => {
  //         if(result){
  //           let ShopsNamesList = this.getListOne('name', result.data)
  //           console.log(ShopsNamesList)
  //           return ShopsNamesList
  //         } else {
  //           console.log("fail 441")
  //           return ''
  //         }
  //       })
  //       .cath(err => {
  //         console.log(err)
  //         console.log("fail 331")
  //         return ''
  //       })
  //     }
  //     return ''
  //   },
  //   getProducts() {
  //     if(this.logData.shop){
  //       Product.getProducts().then(result => {
  //         if(result){
  //           let ProductsNameList = this.getListOne('name', result.data)
  //           console.log(ProductsNameList)
  //           return ProductsNameList
  //         } else {
  //           console.log("fail 444")
  //           return ''
  //         }
  //       })
  //       .cath(err => {
  //         console.log(err)
  //         console.log("fail 334")
  //         return ''
  //       })
  //     }
  //     return ''
  //   }, 
  // },

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

  /*
   watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
  */

    created(){
      
      City.getCities()
        .then(result => {
          if(result){
            this.items.city = this.getListOne('city', result.data)
            console.log(this.getListOne('city', result.data))
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
            this.logData.date = moment().format("YYYY-MM-DD")
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
       }
       

    },


  }
</script>


<style lang="scss" scoped>

</style>
