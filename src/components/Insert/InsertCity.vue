<template>
  <div>

    <!-- <h1 class="main-title">Inserir Cidade</h1> -->

    <v-container fluid style="text-align:center">

      <v-card name="form-district" class="pb-7" elevation="6">
        <ValidationObserver ref="observer">
          <form>

            <!-- Card Title -->
            <v-card-title>
              <h2>
                <span class="headline mb-0 title-form text-break"><v-icon>mdi-city</v-icon>Insira os dados da Cidade</span>
              </h2>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center">
              <ValidationProvider v-slot="{ errors }" name="city" rules="required|max:30">
                <v-text-field label="Cidade" v-model="district.city" :error-messages="errors" required></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="city" rules="required|max:30">
                <v-text-field label="Estado" v-model="district.state" :error-messages="errors" required></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="city" rules="required|max:30">
                <v-text-field label="País" v-model="district.country" :error-messages="errors" required></v-text-field>
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

import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, 
  ValidationProvider, setInteractionMode } from 'vee-validate'

import City from '../../api/City'

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
      district: {
        city: '',
        state: '',
        country: ''
      },
    }
  },

  methods: {

    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          City.post(this.district).then( () => {
            this.$swal({
              title: "Sucesso!",
              text: "A cidade foi cadastrada com sucesso!",
              icon: "success",
              button: "Ok!",
            });
            this.clear()
          })
          .catch(err => {
            if(err.message){
              this.$swal({
                title: "Erro!",
                text: "Cidade " + this.district.city + " já existe!" ,
                icon: "error",
                button: "Ok!",
              });
            } else {
              this.$swal({
                title: "Erro!",
                text: "Erro ao insrerir a Cidade",
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
      this.district.city = ''
      this.district.state = ''
      this.district.country = null
      this.$refs.observer.reset()
    },

  },

}

</script>

<style lang="scss" scoped>

</style>