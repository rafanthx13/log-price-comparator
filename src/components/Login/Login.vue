<template>
  <v-app id="inspire">

    <SpinnerLoader v-if="spinner"></SpinnerLoader>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" style="margin-left: 1px;">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" style="margin-bottom: 30%;">

              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>PriceLog App</v-toolbar-title>
                <span style="margin-left: 10px;">&nbsp;&nbsp;</span>
              </v-toolbar>
              
              <ValidationObserver ref="observer">
                <form>

                  <v-card-text>
                
                    <ValidationProvider v-slot="{ errors }" name="login" rules="required|max:30">
                      <v-text-field label="Usuário" name="login" v-model="loginForm.user_name" 
                        type="text" autocomplete="on" :error-messages="errors">
                        <template v-slot:prepend>
                          <v-icon>mdi-account</v-icon>
                        </template>
                      </v-text-field>
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="password" rules="required|max:30">
                      <v-text-field id="password" label="Senha" name="password" v-model="loginForm.password" 
                        type="password" autocomplete="on" :error-messages="errors"> 
                        <template v-slot:prepend>
                          <v-icon>mdi-lock</v-icon>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                  
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" style="margin-right: 10px;" @click="submit">Login</v-btn>
                    <!-- <router-link to="/register" >
                      <v-btn color="primary">Cadastre-se</v-btn>
                    </router-link> -->
                    <v-btn color="primary" style="margin-right: 10px;" @click="quest">Visitante</v-btn>
                  </v-card-actions>

              </form>
            </ValidationObserver>

            </v-card>

            <!-- <div class="credits mt-3">
              <span>Desenvolvido por <a href="https://rafanthx13.github.io/">Rafael</a></span>
              <span> Imagem de <a href="https://pixabay.com/pt/users/Pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1852945">Pexels</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1852945">Pixabay</a></span>
            </div> -->

            <notifications group="error-login" position="top center" style="top: 10px;"/>

          </v-col>
        </v-row>
      </v-container>
    </v-content>

    

  </v-app>
</template>

<script>

import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, 
  ValidationProvider, setInteractionMode } from 'vee-validate'
import SpinnerLoader from "../Common/Spinner";

import Login from '../../api/Login'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: fieldName =>  'É necessário inserir o campo ' + fieldName,
});

extend('max', {
  ...max,
  message: 'O campo não pode ser maior que 30',
})

export default {

  components: {
    ValidationProvider,
    ValidationObserver,
    SpinnerLoader,
  },

  props: {
    auth: String
  },

  data() {
    return {
      loginForm: {
        user_name: '',
        password: ''
      },
      questLogin: {
        user_name: 'visitante',
        password: 'visitante123'
      },
      spinner: false
      
    }
  },

  mounted: function () {
    if (this.$route.params.auth) {
      this.error_notify('Error de Sessão', 'É necessário logar corretamente para acessar')
    }
  },

  methods: {
    submit() {
      this.$refs.observer.validate().then(result => {
        this.spinner = true;
        if (result) {
          Login.login(this.loginForm).then( (result) => {
            localStorage.setItem('token', result.data.token);
            this.$store.commit("setUser", result.data);
            if (localStorage.getItem('token') != null){
              this.spinner = false;
              this.$router.push({name: 'Home'})
            }
          })
          .catch( () => {
            this.spinner = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.error_notify('Erro de Login', 'Usuário o Senha não encontrados')
          })
        } else {
          this.spinner = false;
          this.error_notify('Error de Formulário', 'Dados inseridos inválidos para login')
        }
      }
    )},

    quest(){
      this.spinner = true;
      Login.login(this.questLogin).then( (result) => {
        localStorage.setItem('token', result.data.token);
        this.$store.commit("setUser", result.data);
        if (localStorage.getItem('token') != null){
          this.spinner = false;
          this.$router.push({name: 'Home'})
        }
      })
      .catch( () => {
        this.spinner = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.error_notify('Erro de Login', 'Usuário o Senha não encontrados')
      })
    },
    
    error_notify(title, text, duration = 7000){
      this.$notify({
        group: 'error-login',
        title: title,
        text: text,
        duration: duration,
        type: 'error',
      });
    },

  },

}

</script>

<style lang="scss" scoped>

.v-spinner {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 500000999;
}

#inspire {
  background-image: url("../../assets/imgs/beach-1852945_1280.jpg");
  background-position: center top;
  background-size: 100% auto;
}

.credits {
  width: max-content;
  background-color: white; 
  background-color: rgba(247, 247, 247, 0.52); 
  border-radius: 20px; 
  padding: 5px;
}

</style>
