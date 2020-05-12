// Instância inicial do Axios
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:300011/' // not workin

let http = axios.create({
	baseURL: 'http://localhost:300011/', // not working
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('token'),
	}
});

// Obriga a colocar Bearer Token
http.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) 
			config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default http;