<template>
  <div>
    <v-container fluid>

      <h1 class="main-title">Área de Listagem de Dados</h1>

      <v-row class="d-flex flex-row mt-5">

        <v-card outlined @click="go_to('List City')" class="mx-10 card-animated mb-2 responsive-cards">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon class="icon">mdi-city</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Listar Cidades</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card outlined @click="go_to('List Shop')" class="mx-10 card-animated mb-2 responsive-cards">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon class="icon">mdi-shopping</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Listar Lojas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card outlined @click="go_to('List Product')" class="mx-10 card-animated mb-2 responsive-cards">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon>mdi-food-variant</v-icon>
                <v-icon>mdi-gas-station</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Listar Produtos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card outlined @click="go_to('List Log')" class="mx-10 card-animated mb-2 responsive-cards">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon>mdi-cart-plus</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Listar Logs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

      </v-row>

    </v-container>

  </div>
</template>

<script>
  export default {

    methods: {
      go_to(link_path) {
        this.$router.push({name :link_path})
      }
    },

  }
</script>

<style lang="scss" scoped>

.icon-options {
  text-align: center;
}

.card-animated {
  transition: all .2s ease-in-out;
}

.card-animated:hover {
  border-color: #3f50b4;
  color: #3f50b4;
}

@media screen and (max-width: 600px) {
  .responsive-cards {
    width: 100%;
  }
}

</style>