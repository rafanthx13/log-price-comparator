<template>
  <div>
    <h1 class="main-title">INSERT PRODUCT</h1>

    <v-container fluid style="text-align:center">
      <v-card class="pb-7" elevation="6">
        <ValidationObserver ref="observer" v-slot="{ validate, handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">

            <!-- Card Title -->
            <v-card-title>
              <v-icon>mdi-city</v-icon>
              <span class="headline mb-0 title-form">Insira os dados do Produto</span>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center">
              <v-form>
                <ValidationProvider v-slot="{ errors }" name="name" rules="max:30">
                  <v-text-field label="Nome" v-model="productData.name" :error-messages="errors" required>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="name" rules="max:30">
                  <v-text-field label="Tipo" v-model="productData.type" :error-messages="errors"></v-text-field>
                </ValidationProvider>
                <!-- <v-text-field label="Imagem-Icone" v-model="state" required></v-text-field> -->
              </v-form>
            </v-card-text>

            <!-- Card Buttons -->
            <v-card-action style="display: inline-flex;">
              <v-btn class="mr-4" @click="submit">Enivar</v-btn>
              <v-btn @click="clear">Limpar</v-btn>
            </v-card-action>

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
  import Product from '../../api/Product'

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

    data() {
      return {
        productData: {
          name: '',
          type: '',
        },
        valid: true,
      }
    },

    methods: {

      submit() {
        this.$refs.observer.validate()
          .then(result => {
            if (result) {
              Product.post(this.productData).then(result => {
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
        this.productData.name = ''
        this.productData.type = ''
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