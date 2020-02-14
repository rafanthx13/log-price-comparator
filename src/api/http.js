// Instância inicial do Axios
import axios from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	}
});

export default http;