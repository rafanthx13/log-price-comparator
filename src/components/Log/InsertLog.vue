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
                <v-text-field label="Preço" v-model.lazy="logData.price" :error-messages="errors" v-money="myMaskMoney" required></v-text-field>
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
  import {VMoney} from 'v-money'

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
          shop: ['loja-test'],
          product: ['Leite'],
        },
        logData: {
          city: '',
          shop: '',
          product: '',
          price: '',
        },
        valid: true,
        myMaskMoney: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
      }
    },

    methods: {

      submit() {
        // Metodo do componente que retorna um Promisse que 
        // tem como retorno 'resul' :: Boolean da validação
        this.$refs.observer.validate()
          .then(result => {
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

    }
  }
</script>


<style lang="scss" scoped>

</style>