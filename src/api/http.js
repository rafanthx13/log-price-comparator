// Instância inicial do Axios
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:300011/' // not workin

const http = axios.create({
	baseURL: 'http://localhost:300011/', // not working
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token'),
	}
});


export default http;