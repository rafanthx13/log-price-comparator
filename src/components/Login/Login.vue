<template>
	<v-app id="inspire">

		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center" style="margin-left: 1px;">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12" style="margin-bottom: 30%;">

							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Log-Comparator App</v-toolbar-title>
								<span style="margin-left: 10px;">&nbsp;&nbsp;v1.0.3</span>
							</v-toolbar>
							
							<ValidationObserver ref="observer">
								<form>

									<v-card-text>
								
										<ValidationProvider v-slot="{ errors }" name="login" rules="required|max:30">
											<v-text-field label="Login" name="login" v-model="loginForm.user_name" 
												type="text" autocomplete="on" :error-messages="errors">
												<template v-slot:prepend>
													<v-icon>mdi-account</v-icon>
												</template>
											</v-text-field>
										</ValidationProvider>

										<ValidationProvider v-slot="{ errors }" name="password" rules="required|max:30">
											<v-text-field id="password" label="Password" name="password" v-model="loginForm.password" 
												type="password" autocomplete="on" :error-messages="errors">	
												<template v-slot:prepend>
													<v-icon>mdi-lock</v-icon>
												</template>
											</v-text-field>
										</ValidationProvider>
									
									</v-card-text>

									<v-card-actions>
										<v-spacer />
										<v-btn color="primary" style="margin-right: 10px;" @click="submit">Login</v-btn>
										<router-link to="/register" >
											<v-btn color="primary">Cadastre-se</v-btn>
										</router-link>
									</v-card-actions>

							</form>
						</ValidationObserver>

						</v-card>

						<notifications group="error-login" position="top center" style="top: 10px;"/>

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
// import './../store';

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

	props: {
		auth: String
	},

	data() {
		return {
			loginForm: {
				user_name: '',
				password: ''
			},
			
		}
	},

	mounted: function () {
		if (this.$route.params.auth) {
			this.error_notify('Error de Sessão', 'É necessário logar corretamente para acessar')
		}
	},

	methods: {
		submit() {
			this.$refs.observer.validate().then(result => {
				if (result) {
					Login.login(this.loginForm).then( (result) => {
						localStorage.setItem('user', result.data.user)
						localStorage.setItem('token', result.data.token)
						if (localStorage.getItem('token') != null){
							this.$router.push({name: 'Home'})
						}
					})
					.catch( () => {
						localStorage.removeItem('user');
						localStorage.removeItem('token');
						this.error_notify('Erro de Login', 'Usuário o Senha não encontrados')
					})
				} else {
					this.error_notify('Error de Formulário', 'Dados inseridos inválidos para login')
				}
			}
		)},
		
		error_notify(title, text, duration = 7000){
			this.$notify({
				group: 'error-login',
				title: title,
				text: text,
				duration: duration,
				type: 'error',
			});
		},

	},

}

</script>

<style lang="scss" scoped>

</style>
