<template>
	<div>
		
			<div>
				<h1 style="text-align: center;">Rafael Morais de Assis</h1>
			</div>
			
			<div class="mt-2">
				<img src="../assets/imgs/my_foto.jpg" alt="avatar" class="img-circle mr-3" style="width:20%;float: left;border-radius: 50%;">
				<p>Olá. Estudante Graduando de Computação e desenvolvedor Full-Stack e um entusiasta de Machine Learning.</p>
				<p>Se você tem algum comentário ou sugestão apra essa aplicação, me mande uma mensagem por e-mail ou rede sociais.</p>		
			</div>
			
		<div>
			<router-link to="mailto:rafaassis15@gmail.com" >
				<v-icon class="icon-social-media">mdi-gmail</v-icon>
			</router-link>
			<router-link to="https://www.instagram.com/rafael_m_assis/" >
				<v-icon class="icon-social-media">mdi-instagram</v-icon>
			</router-link>
			<router-link to="https://www.facebook.com/rafael.assis.54390" >
				<v-icon class="icon-social-media">mdi-facebook-box</v-icon>
			</router-link>
			<router-link to="https://www.linkedin.com/in/rafael-m-de-assis/" >
				<v-icon class="icon-social-media">mdi-linkedin-box</v-icon>
			</router-link>
			<router-link to="https://github.com/rafanthx13" >
				<v-icon class="icon-social-media">mdi-github-circle</v-icon>
			</router-link>
		</div>
				
	</div>
</template>

<script>
	export default {
		
	}
</script>

<!-- o link 'a' é gerado pelo vue -->
<style lang="scss" scoped>

	a {
		text-decoration: none;
	}

	.icon-social-media {
		font-size: 36px;
		padding: 15px 15px 15px 15px;
		border-radius: 50px;
	}

	.icon-social-media:hover {
		background-color: #3f50b4;
		color: white;
	}

</style>