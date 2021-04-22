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
            <v-list-item-title>Home</v-list-item-title>
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
        <template v-if="this.$store.getters.getUser.user_type != 'QUEST'">
          <v-list-item @click="go_to('Insert Main')">
            <v-list-item-action>
              <v-icon>mdi-plus-box-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Inserir</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

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

        <!-- List (To admins) -->
        <template v-if="this.$store.getters.getUser.user_type == 'admin'">
          <v-list-item @click="go_to('List Main')">
            <v-list-item-action>
              <v-icon>mdi-view-list</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Listar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-list>
    </v-navigation-drawer>

    <!-- Header Bar on Top -->
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>LogPrice App {{this.$store.getters.getUser.user_type}}</v-toolbar-title>

      <v-spacer /> <!-- Espaço para jogar pro lado -->

      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">

        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs"  v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>

          <v-list-item @click="log_out()">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>

        </v-list>

      </v-menu>

    </v-app-bar>

    <!-- Content -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>

          <router-view></router-view>

        </v-layout>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020 | {{ this.$store.getters.getVersion.version }}</span>
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
      go_to(link_path) {
        this.$router.push({name: link_path}).catch(() => {}) // evitar um Error de NavegationDuplicate
      },

      log_out(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.$router.push({name: 'Login'})
      },

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