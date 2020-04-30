<template>
  <v-app id="inspire">

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">

          <div class="flex flex-row" style="text-align: center;">
            
            <div>
              <h1>Página Não encontrada</h1>  
            </div>
          
            <div>
              <router-link :to="{ name: 'Login'}">
                <v-btn color="primary">Voltar</v-btn>
              </router-link>
            </div>

          </div>

        </v-row>
      </v-container>
    </v-content>
  </v-app>
  
</template>

<script>
  
export default {

}

</script>

<style lang="scss" scoped>

</style>