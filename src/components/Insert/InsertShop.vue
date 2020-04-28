<template>
  <div>
    <!-- <h1 class="main-title">Inserir Lojas</h1> -->

    <v-container fluid style="text-align:center">
      <v-card class="pb-7" elevation="6">
        <ValidationObserver ref="observer" >
          <form>

            <!-- Card Title -->
            <v-card-title>
              <h2>
                <span class="headline mb-0 title-form text-break"><v-icon>mdi-shopping</v-icon>Insira os dados do Estabelecimento</span>  
              </h2>
            </v-card-title>

            <!-- Card Content -->
            <v-card-text primary-title style="justify-content:center">
              <v-form>
                <ValidationProvider v-slot="{ errors }" name="name" rules="required|max:30">
                  <v-text-field label="Loja" v-model="shopData.name" :error-messages="errors" required></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="cep" rules="required|max:30">
                  <v-text-field label="CEP" v-model="shopData.cep" :error-messages="errors" v-on:keyup="buscarCEP" v-mask="cepMask"></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="number" rules="required|max:30">
                  <v-text-field type="number" label="Número" v-model="shopData.number" :error-messages="errors"></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="street" rules="required|max:30">
                  <v-text-field label="Rua" v-model="shopData.street" :error-messages="errors"></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="neighbor" rules="required|max:30">
                  <v-text-field label="Bairro" v-model="shopData.neighbor" :error-messages="errors"></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="city" rules="required|max:30">
                  <v-text-field label="Cidade" v-model="shopData.city" :error-messages="errors"></v-text-field>
                </ValidationProvider>
              </v-form>
            </v-card-text>

            <!-- Card Buttons -->
            <v-card-actions style="display: inline-flex;">
              <v-btn class="mr-4" @click="submit">Enviar</v-btn>
              <v-btn @click="clear">Limpar</v-btn>
            </v-card-actions>

          </form>
        </ValidationObserver>
      </v-card>
      <notifications group="error-login" position="top right" style="top: 10px;"/>
    </v-container>

  </div>
</template>

<script>

import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver,
  ValidationProvider, setInteractionMode } from 'vee-validate'
import Shop from '../../api/Shop'
import axios from 'axios'
import { mask } from 'vue-the-mask'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'É necessário inserir dados nesse campo',
})

extend('max', {
  ...max,
  message: 'O campo não pode ser maior que {length}',
})

export default {

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  directives: { mask },

  data() {
    return {
      cepMask: '#####-###',
      shopData: {
        name: '',
        number: '',
        cep: '',
        street: '',
        neighbor: '',
        city: '',
      },
    }
  },

  methods: {

    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          Shop.post(this.shopData).then( () => {
            this.$swal({
              title: "Sucesso!",
              text: "O Estabelecimento foi cadastrado com sucesso!",
              icon: "success",
              button: "Ok!",
            });
            this.clear()
          })
          .catch(err => {
            console.error(err)
          })
        } 
      })
      .catch((err) => {
        console.error(err)
      });
    },

    clear() {
      this.shopData.name = ''
      this.shopData.number = ''
      this.shopData.cep = ''
      this.shopData.street = ''
      this.shopData.neighbor = ''
      this.shopData.city = ''
      this.$refs.observer.reset()
    },

    buscarCEP(){
      let regexCEP = /^[0-9]{5}-[0-9]{3}$/
      if(regexCEP.test(this.shopData.cep)){
        axios.get("https://viacep.com.br/ws/" + this.shopData.cep + "/json/")
        .then( endereco => {
          if( !endereco || endereco.data.erro){
            this.errorCEP("CEP não encontrado")
          } else if(endereco){
            this.shopData.street = endereco.data.logradouro;
            this.shopData.neighbor = endereco.data.bairro;
            this.shopData.city = endereco.data.localidade;
          }
        })
        .catch( () => {
          this.errorCEP("Erro na Busca automática de CEP")
        });
      }
    },

    errorCEP(textMessage){
      this.$notify({
        group: 'error-login',
        title: "Erro no CEP",
        text: textMessage,
        duration: 6000,
        type: 'error',
      });
    }

  }

}

</script>

<style lang="scss" scoped>

</style>