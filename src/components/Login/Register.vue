<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<ValidationObserver ref="observer">
							<form>
								<v-card class="elevation-12" style="margin-bottom: 30%;">

									<v-toolbar color="primary" dark flat>
										<v-toolbar-title>Cadastre-se</v-toolbar-title>
									</v-toolbar>
									
									<v-card-text>
											<ValidationProvider v-slot="{ errors }" name="rmsil" rules="required|max:30">
											<v-text-field label="Email" name="email" v-model="loginForm.email" type="email" :error-messages="errors">
												<template v-slot:prepend>
													<v-icon>mdi-email</v-icon>
												</template>
											</v-text-field>
											</ValidationProvider>

											<ValidationProvider v-slot="{ errors }" name="user_name" rules="required|max:30">
											<v-text-field label="Login" name="user_name" v-model="loginForm.user_name" type="text" :error-messages="errors">
												<template v-slot:prepend>
													<v-icon>mdi-account</v-icon>
												</template>
											</v-text-field>
											</ValidationProvider>

											<ValidationProvider v-slot="{ errors }" name="password" rules="required|max:30">
											<v-text-field id="password" label="Password" name="password" v-model="loginForm.password" 
												type="password" :error-messages="errors">	
												<template v-slot:prepend>
														<v-icon>mdi-lock</v-icon>
												</template>
											</v-text-field>
											</ValidationProvider>

									</v-card-text>

									<v-card-actions>
										<v-spacer />
										<v-btn color="primary" @click="submit">Cadastrar</v-btn>
									</v-card-actions>

								</v-card>
							</form>
						</ValidationObserver>
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

import Login from '../../api/Login'

setInteractionMode('eager')

extend('required', {
	...required,
	message: 'É necessário inserir dados nesse campo',
})

extend('max', {
	...max,
	message: 'O campo não pode ser maior que 30',
})

export default {

	components: {
		ValidationProvider,
		ValidationObserver,
	},

	data() {
		return {
			loginForm: {
				user_name: '',
				password: '',
				email: ''
			}
		}
	},

	methods: {
		submit() {
			this.$refs.observer.validate().then(result => {
				if (result) {
					Login.register(this.loginForm).then( () => {
						this.$swal({
							title: "Sucesso!",
							text: "O Usuário foi cadastrado com sucesso!",
							icon: "success",
							button: "Ok!",
						});
						
					})
					.catch(err => {
						console.error(err)
						this.$swal({
							title: "Erro!",
							text: "Error ao cadastrar usuário",
							icon: "error",
							button: "Ok!",
						});
					})
				} 
			})
			.catch((err) => {
				console.error(err)
			});
		},

		clear() {
			this.loginForm.user_name = ''
			this.loginForm.password = ''
			this.loginForm.email = ''
			this.$refs.observer.reset()
		},

	},
}

</script>

<style lang="scss" scoped>

</style>