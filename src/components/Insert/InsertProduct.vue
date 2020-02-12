<template>
  <div>
    <h1 class="main-title">INSERT PRODUCT</h1>

    <v-container fluid style="text-align:center">
      <v-card class="pb-7" elevation="6">

        <!-- Card Title -->
        <v-card-title>
          <v-icon>mdi-city</v-icon>
          <span class="headline mb-0">Insira os dados da Cidade</span>
        </v-card-title>

        <!-- Card Content -->
        <v-card-text primary-title style="justify-content:center">
          <v-form>
            <v-text-field label="Nome" v-model="city" required></v-text-field>
            <v-text-field label="Tipo-COmida-Gas" v-model="state" :rules="nameRules" required></v-text-field>
            <v-text-field label="Imagem-Icone" v-model="state" :rules="nameRules" required></v-text-field>
          </v-form>
        </v-card-text>

        <!-- Card Buttons -->
        <v-card-action>
          <v-btn class="mr-4" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-card-action>

      </v-card>
    </v-container>


  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>