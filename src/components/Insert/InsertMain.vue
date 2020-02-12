<template>
  <div>
    <v-container fluid>

      <h1 class="main-title">INSERT MAIN</h1>

      <v-row class="d-flex flex-row mt-5">

        <v-card max-width="344" outlined @click="go_to('Insert City')" class="mx-10">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon>mdi-city</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Município</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card max-width="344" outlined @click="go_to('Insert Shop')" class="mx-10">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon>mdi-shopping</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Estabeleciomento</v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
          </v-list-item>

        </v-card>

        <v-card max-width="344" outlined @click="go_to('Insert Product')" class="mx-10">
          <v-list-item three-line>
            <v-list-item-content class="icon-options">
              <div class="overline mb-4">
                <v-icon>mdi-food-variant</v-icon>
                <v-icon>mdi-gas-station</v-icon>
              </div>
              <v-list-item-title class="headline mb-1">Produto</v-list-item-title>
              <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
            </v-list-item-content>
            <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
          </v-list-item>
        </v-card>

      </v-row>
      

    </v-container>

    

  </div>
</template>

<script>
  export default {

    methods: {
      // Não consegui por $router.push 'in_code' entao eupus aqui
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
</style>