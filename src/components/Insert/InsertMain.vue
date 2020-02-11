<template>
  <div>

    <v-container fluid >

      <h1 class="main-title">INSERT MAIN</h1>

      <v-row   class="d-flex flex-row">

        <v-card max-width="344" outlined @click="go_to('/')" class="mx-10">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        
      </v-card>

      <v-card max-width="344" outlined @click="go_to('/')" class="mx-10">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
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
        this.$router.push(link_path)
      }
    },

  }
</script>

<style lang="scss" scoped>


</style>