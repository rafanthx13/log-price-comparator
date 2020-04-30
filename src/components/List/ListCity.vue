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
				<template v-slot:top>
					<v-toolbar flat color="white">

						<v-toolbar-title>Listar Cidades</v-toolbar-title>

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
									<span class="headline">Editar Cidade</span>
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
														<ValidationProvider v-slot="{ errors }" name="state" rules="required">
															<v-text-field v-model="editedItem.state" :error-messages="errors" label="Estado" required></v-text-field>
														</ValidationProvider>
													</v-col>
													<v-col cols="12" sm="6" md="4">
														<ValidationProvider v-slot="{ errors }" name="country" rules="required">
															<v-text-field v-model="editedItem.country" :error-messages="errors" label="País" required></v-text-field>
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
													<v-text-field v-model="deletedItem.state" label="Estado" outlined disabled></v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="deletedItem.country" label="País" outlined disabled></v-text-field>
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
				<v-icon	class="mr-2 edit-icon" @click="editItem(item)">
					mdi-pencil
				</v-icon>
				<v-icon class="delete-icon"	@click="deleteItem(item)">
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

setInteractionMode('eager')

extend('required', {
	...required,
	message: 'É necessário inserir esse campo',
})

import City from '../../api/City';

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
				{ text: 'Cidade', value: 'city', filtable: false },
				{ text: 'Estado', value: 'state' },
				{ text: 'País', value: 'country' },
				{ text: 'Ações', value: 'actions', sortable: false },
			],
			rows: [{}],
			editedIndex: -1,
			deletedIndex: -1,
			editDialog: false,
			deleteDialog: false,
			editedItem: {
				'city_id': '',
				'city': '',
				'state': '',
				'country': '',
			},
			deletedItem: {
				'city_id': '',
				'city': '',
				'state': '',
				'country': '',
			},
			defaultItem: {
				'city_id': '',
				'city': '',
				'state': '',
				'country': '',
			},
		}
	},

	created(){
		City.getAll()
			.then( (result) => {
				if(result.data.length == 0){
					this.$notify({
						group: 'error-notify',
						title: "Erro na busca de Cidades",
						text: "Não retornou nenhuma cidade",
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
					text: "Erro ao buscar cidades",
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
					City.put(this.editedItem)
					.then( () => {
						this.emitSwal("Sucesso!", "A cidade foi editada com sucesso!", "success");
						Object.assign(this.rows[this.editedIndex], this.editedItem)
						this.editClose();
					})
					.catch( err => {
						let msg = err.status == 404  
							? "A Cidade já está sendo referenciada em outra tabela e NÃO PODE SER EDITADA" 
							: "Erro ao Editar cidade";
						this.emitSwal("Erro!", msg, "error");
						this.deleteClose();
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
			City.delete(this.deletedItem)
				.then( () => {
					this.rows.splice(this.deletedIndex, 1)
					this.emitSwal("Sucesso!", "A cidade foi deletada com sucesso!", "success");
					this.editClose();
				})
				.catch( err => {
					let msg = err.status == 404 
						? "A Cidade já está sendo referenciada em outra tabela e NÃO PODE SER DELETADA" 
						: "Erro ao Deletar cidade";
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
