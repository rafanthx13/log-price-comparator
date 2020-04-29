<template>
  <div>

    <notifications group="error-login" position="top right" style="top: 10px;"/>

      <v-container fluid style="text-align:center">

        <v-card name="form-district" class="pb-7" elevation="6">
          <ValidationObserver ref="observer" >
            <form>

              <!-- Card Title -->
              <v-card-title>
                <h1>
                  <span class="headline mb-0 title-form text-break"><v-icon>mdi-cart-plus</v-icon>Insira os dados de um Registro</span>  
                </h1>
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
                <ValidationProvider v-slot="{ errors }" name="price" rules="required">
                  <v-text-field label="Preço" v-model.lazy="money" :error-messages="errors" v-money="myMaskMoney" required></v-text-field>
                </ValidationProvider>
                <!-- {{ this.money }} -->
                <!-- Time -->
                <ValidationProvider v-slot="{ errors }" name="date" rules="required|date">
                  <v-text-field label="Data" v-model="logData.date" :error-messages="errors" v-mask="dateMask" placeholder="dd/mm/yyyy HH:mm" :disabled="!setDate"></v-text-field>
                </ValidationProvider>
                <v-switch v-model="setDate" class="ma-4" :label="labelDate(setDate)"></v-switch>
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
  
import { required, max  } from 'vee-validate/dist/rules'

import { extend, ValidationObserver,
  ValidationProvider, setInteractionMode } from 'vee-validate'

import Log from '../../api/Log'
import City from '../../api/City'
import Shop from '../../api/Shop'
import Product from '../../api/Product'

import {VMoney} from 'v-money'
import moment from 'moment'
import { mask } from 'vue-the-mask'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'É necessário inserir dados nesse campo',
})

extend('max', {
  ...max,
  message: 'O campo não pode ser maior que 30',
})

extend('date', {
  validate: value => {
    return moment(value, "DD/MM/YYYY HH:mm").isValid();
  },
  message: 'Data Inválida',
});

export default {

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  directives: {money: VMoney, mask},

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
      // O v-mask nao permite alterar o elemetno mascarado, entao, 
      // deixamos separado e depois na hora de enviar converte para o logData.price
      setDate: false,
      money: '',
      dateMask: '##/##/#### ##:##',
      myMaskMoney: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
    }
  },

  watch: {

    'logData.city': function () {
      if(this.logData.city){
        Shop.getShopsByCity(this.logData.city).then(result => {
          if(result){
            let ShopsNamesList = this.getListOne('name', result.data)
            // console.log(ShopsNamesList)
            this.items.shop = ShopsNamesList
          } else {
             this.logData.shop = []
          }
        })
        .catch(err => {
          console.log(err)
          this.logData.shop = []
        })
      } else {
        this.items.shop = []
      }
    },

    'logData.shop': function(){
      if(this.logData.shop){
        Product.getProductsNames(this.logData.city).then(result => {
          if(result){
            let ProductsNameList = this.getListOne('product', result.data)
            // console.log(ProductsNameList)
            this.items.product = ProductsNameList
          } else {
            this.items.product = []
          }
        })
        .catch(err => {
          console.log(err)
          this.items.product = []
        })
      } else{
        this.items.product = []
      }
    }

  },


  created(){
    this.logData.date = moment().format("DD/MM/YYYY HH:mm")
    City.getCities().then( result => {
      if(result){
          this.items.city = this.getListOne('city', result.data)
          // console.log(this.getListOne('city', result.data))
        } else {
          console.log("fail 442")
        }
    }).catch(err => {
      console.log(err)
    })
  },

  methods: {

    submit() {
      // Metodo do componente que retorna um Promisse que 
      // tem como retorno 'resul' :: Boolean da validação
      this.$refs.observer.validate().then(result => {
        this.logData.price = parseFloat(this.money.slice(3).replace(".","").replace(",","."))
        if (result && this.logData.price != 0) {
          
          Log.post(this.logData).then( () => {
            this.$swal({
              title: "Sucesso!",
              text: "Log foi registrado com sucesso!",
              icon: "success",
              button: "Ok!",
            });
            this.clear()
          }).catch( () => {
            this.$swal({
              title: "Erro!",
              text: "Erro ao insrerir a Cidade",
              icon: "error",
              button: "Ok!",
            });
          })
        } else if (this.logData.price == 0){
          this.$notify({
            group: 'error-login',
            title: "Erro no preço",
            text: "Preço não pode ser Zero",
            duration: 6000,
            type: 'error',
          });
        }
      }).catch( err => {
        console.log(err)
        this.$notify({
          group: 'error-login',
          title: "Erro no formulário 2",
          text: "",
          duration: 6000,
          type: 'error',
        });
      });
    },

    clear() {
      this.logData.price = null
    },

    // Pega um array de Um mesmo Ojeto JSON e retorno só os elementos
    getListOne(attr, json_list){
      let aList = []
      for (let obj in json_list){
        aList.push(json_list[obj][attr])
      }
      return aList
    },

    // formatMoneyToSend(maskedMoney){
    //   let deMaskMoney = 
    //   return deMaskMoney
    // },

    labelDate(bool){
      return bool ? "Escolher Data" : "Hoje"
    },

  },

}

</script>

<style lang="scss" scoped>

</style>
