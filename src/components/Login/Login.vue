<template>
	<v-app id="inspire">

		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12" style="margin-bottom: 30%;">

							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Login Form</v-toolbar-title>
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
										<v-btn color="primary" @click="submit">Login</v-btn>
									</v-card-actions>


							</form>
						</ValidationObserver>

						</v-card>

						<notifications group="notify-unauthorized" position="top center" style="top: 10px;"/>

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
		if(this.$route.query.auth == 'false'){
			console.log("re")
			this.$notify({
				group: 'notify-unauthorized',
				title: 'Error de Sessão',
				text: 'É necessário logar corretamente para acessar',
				duration: 7000,
				type: 'error',
			});
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
					.catch(err => {
						console.error(err.response)
						this.$swal({
							title: "Erro!",
							text: "Ao logar",
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
	},

}

</script>

<style lang="scss" scoped>

</style>