<template>
  <div>

    <v-container fluid style="text-align:center">

      <!-- Card -->
      <v-card class="pb-7" elevation="6">
        <ValidationObserver ref="observer">
          <form>

            <!-- Card Title -->
            <v-card-title>
              <h2>
                <span class="headline mb-0 title-form text-break"><v-icon>mdi-city</v-icon>Insira os dados do Produto</span>  
              </h2>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center">
              <v-form>
                <ValidationProvider v-slot="{ errors }" name="name" rules="required|max:30">
                  <v-text-field label="Nome" v-model="productData.name" :error-messages="errors" required>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="type" rules="required|max:30">
                  <v-text-field label="Tipo" v-model="productData.type" :error-messages="errors" required></v-text-field>
                </ValidationProvider>
              </v-form>
            </v-card-text>

            <!-- Card Buttons -->
            <v-card-actions style="display: inline-flex;" name="form-action">
              <v-btn class="mr-4" @click="submit">Enivar</v-btn>
              <v-btn @click="clear">Limpar</v-btn>
            </v-card-actions>

          </form>
        </ValidationObserver>
      </v-card>

    </v-container>

  </div>
</template>

<script>

import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, 
  ValidationProvider, setInteractionMode } from 'vee-validate'
import Product from '../../api/Product'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'É necessário inserir dados nesse campo',
})

extend('max', {
  ...max,
  message: 'O campo não pode ser maior que 30',
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
    }
  },

  methods: {

    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) { 
          Product.post(this.productData).then( () => {
            this.$swal({
              title: "Sucesso!",
              text: "O produto foi cadastrado com sucesso!",
              icon: "success",
              button: "Ok!",
            });
            this.clear()
          })
          .catch(err => {
            if(err.message){
              this.$swal({
                title: "Erro!",
                text: "Produto " + this.productData.name + " já existe!" ,
                icon: "error",
                button: "Ok!",
              });
            }else{
              console.error(err)
              this.$swal({
                title: "Erro!",
                text: "Erro ao insrerir Produto",
                icon: "error",
                button: "Ok!",
              });
            }
            
          })
        } 
      })
      .catch((err) => {
        console.error(err)
      });
    },

    clear() {
      this.productData.name = ''
      this.productData.type = ''
      this.$refs.observer.reset()
    },

  }

}

</script>

<style lang="scss" scoped>

</style>