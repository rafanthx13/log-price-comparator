// Instância inicial do Axios
import axios from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	}
});


export default http;