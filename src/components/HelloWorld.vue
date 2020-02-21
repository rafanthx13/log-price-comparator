<template>
  <v-app id="inspire">

    <!-- NavBar a Direita -->
    <v-navigation-drawer v-model="drawer" app width="150">
      <v-list dense>

        <!-- Home . -->
        <v-list-item @click="go_to('Home')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Casa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- About Me -->
        <v-list-item @click="go_to('About Me')">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contato</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Inset Data -->
        <v-list-item @click="go_to('Insert Main')">
          <v-list-item-action>
            <v-icon>mdi-plus-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inserir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <!-- Log -->
        <v-list-item @click="go_to('Log')">
          <v-list-item-action>
            <v-icon>mdi-cart-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>+ Log</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Search -->
        <v-list-item @click="go_to('Search')">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pesquisar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- Header Bar on Top -->
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>LogPrice App</v-toolbar-title>
    </v-app-bar>

    <!-- Conteudo -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>

          <router-view></router-view>

        </v-layout>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>

  </v-app>
</template>

<script>
  export default {

    data() {
      return {
        drawer: null
      }
    },

    methods: {
      // Não consegui por $router.push 'in_code' entao eupus aqui
      go_to(link_path) {
        this.$router.push({name: link_path})
      }
    },

  }
</script>

<style lang="scss" >
.main-title {
  text-align: center;
}

.title-form {
  font-size: 1.3rem !important;
}

.swal-footer {
  text-align: center;
}
</style>