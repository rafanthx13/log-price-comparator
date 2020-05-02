<template>
  <div>

    <notifications group="error-notify" position="top right" style="top: 10px;"/>

    <v-card>
      <v-data-table
        v-model="selected"
        class="elevation-1"
        :headers="headers"
        :items="rows"
        item-key="city_id"
        :search="search"
      >
        <!-- Customizar uma coluna -->
        <template v-slot:item.price="{ item }">
          <span>R$ {{ item.price }} </span>
        </template>

        <template v-slot:top>
          <v-toolbar flat color="white">

            <v-toolbar-title>Listar Logs</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          
            <v-dialog v-model="editDialog" max-width="500px">
              <v-card>

                <v-card-title>
                  <span class="headline">Editar Log</span>
                </v-card-title>

                <v-card-text>
                  <ValidationObserver ref="editForm">
                    <form>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <ValidationProvider v-slot="{ errors }" name="city" rules="required">
                              <v-text-field v-model="editedItem.city" :error-messages="errors" label="Cidade" required></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <ValidationProvider v-slot="{ errors }" name="shop" rules="required">
                              <v-text-field v-model="editedItem.shop" :error-messages="errors" label="Loja" required></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <ValidationProvider v-slot="{ errors }" name="product" rules="required">
                              <v-text-field v-model="editedItem.product" :error-messages="errors" label="Produto" required></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <ValidationProvider v-slot="{ errors }" name="price" rules="required|price">
                              <v-text-field v-model.lazy="editedItem.price" :error-messages="errors" label="Preço" prefix="R$" hint="Formato: ..#.###,##" required></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <ValidationProvider v-slot="{ errors }" name="date" rules="required|date">
                              <v-text-field v-model="editedItem.date" :error-messages="errors" label="Data" hint="dd/mm/YYYY HH:mm" required></v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </form>
                  </ValidationObserver>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="editClose">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="confirmEdit">Editar</v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog>

            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>

                <v-card-title>
                  <span class="headline">Deseja Deletar o Item a seguir?</span>
                </v-card-title>

                <v-card-text>
                  
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="deletedItem.city" label="Cidade" outlined disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="deletedItem.shop" label="Loja" outlined disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="deletedItem.product" label="Produto" outlined disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4"> <!-- v-money="myMaskMoney" -->
                          <v-text-field v-model.lazy="deletedItem.price" label="Preço" prefix="R$" outlined disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="deletedItem.date" label="Data" outlined disabled></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="deleteClose">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="confirmDelete">Deletar</v-btn>
                </v-card-actions>

              </v-card>
            </v-dialog> 

          </v-toolbar>
        </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2 edit-icon" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon class="delete-icon" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      </v-data-table> 
    </v-card>
  </div>
</template>

<script>

import { required } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, 
  ValidationProvider, setInteractionMode } from 'vee-validate'

import moment from 'moment'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: fieldName =>  'É necessário inserir o campo ' + fieldName,
});

extend('price', {
  validate: value => {
    // Regex original: ^(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$
    return value.match(new RegExp("^(\\d{1,3}(\\.\\d{3})*|\\d+)(\\,\\d{2})?$", 'g'));
  },
  message: 'Preço Inválido: Formato: #.###,##',
});


extend('date', {
  validate: value => {
    return moment(value, "DD/MM/YYYY HH:mm").isValid();
  },
  message: 'Data Inválida: Deve ter o formato DD/MM/YYYY HH:mm',
});


import Log from '../../api/Log';

export default {

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      singleSelect: true,
      selected: [],
      search: '',
      headers: [
        { text: 'Produto', value: 'product', filtable: true  },
        { text: 'Preço', value: 'price' },
        { text: 'Loja', value: 'shop', filtable: true  },
        { text: 'Cidade', value: 'city' },
        { text: 'Data', value: 'date' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      rows: [{}],
      editedIndex: -1,
      deletedIndex: -1,
      editDialog: false,
      deleteDialog: false,
      editedMoney: '',
      editedItem: {
        'log_id': '',
        'product': '',
        'shop': '',
        'city': '',
        'date': '',
        'price': '',
      },
      deletedItem: {
        'log_id': '',
        'product': '',
        'shop': '',
        'city': '',
        'date': '',
        'price': '',
      },
      defaultItem: {
        'log_id': '',
        'product': '',
        'shop': '',
        'city': '',
        'date': '',
        'price': '',
      },
      myMaskMoney: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
    }
  },

  created(){
    Log.getAll()
      .then( (result) => {
        if(result.data.length == 0){
          this.$notify({
            group: 'error-notify',
            title: "Erro na busca de Logs",
            text: "Não retornou nenhum Log",
            duration: 6000,
            type: 'error',
          });
        }
        this.rows = result.data;
      })
      .catch( () => {
        this.$notify({
          group: 'error-notify',
          title: "Error!",
          text: "Erro ao buscar Logs",
          duration: 6000,
          type: 'error',
        });
      });
  },

  methods: {

    editItem (item) {
      this.editedIndex = this.rows.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem (item) {
      this.deletedIndex = this.rows.indexOf(item)
      this.deletedItem = Object.assign({}, item)
      this.deleteDialog = true
    },

    editClose() {
      this.editDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    deleteClose(){
      this.deleteDialog = false
      setTimeout(() => {
        this.deletedItem = Object.assign({}, this.defaultItem)
        this.deletedIndex = -1
      }, 300)
    },

    confirmEdit(){
      this.$refs.editForm.validate().then( (formIsValid) => {
        if(formIsValid){
          this.editedItem.price = this.editedItem.price.replace('.','').replace(',','.')
          Log.put(this.editedItem)
            .then( () => {
              this.$swal({
                title: "Sucesso",
                text: "O Log foi editado com sucesso!",
                icon: "success",
                button: "Ok!",
              }).then( value => {
                if(value){
                  Object.assign(this.rows[this.editedIndex], this.editedItem)
                  this.editClose();  
                }
              });
            })
            .catch( err => {
              let msg = err.response.status == 404  
                ? "A loja já está sendo referenciada em outra tabela e NÃO PODE SER EDITADO" 
                : "Erro ao Editar log";
              this.emitSwal("Erro!", msg, "error");
              this.editClose();
            });
        } else {
          this.$notify({
            group: 'error-notify',
            title: "Error!",
            text: "Erro na validação dos dados",
            duration: 4000,
            type: 'error',
          });
        }
      });
    },

    confirmDelete(){
      Log.delete(this.deletedItem)
        .then( () => {
          this.$swal({
            title: "Sucesso",
            text: "O Log foi deletado com sucesso!",
            icon: "success",
            button: "Ok!",
          }).then( value => {
            if(value){
              this.rows.splice(this.deletedIndex, 1)
              this.deleteClose();  
            }
          });
        })
        .catch( err => {
          let msg = err.response.status == 404 
            ? "A loja já está sendo referenciada em outra tabela e NÃO PODE SER DELETADO" 
            : "Erro ao Deletar log";
          this.emitSwal("Erro!", msg, "error");
          this.deleteClose();
        });
    },

    emitSwal(title, text, icon){
      this.$swal({
        title: title,
        text: text,
        icon: icon,
        button: "Ok!",
      });
    },

  },

}
  
</script>

<style lang="scss" scoped>

.delete-icon:hover{
  color: red;
  transition: all .2s ease-in-out;
}

.edit-icon:hover{
  color: yellow;
  transition: all .2s ease-in-out;
}

</style>
