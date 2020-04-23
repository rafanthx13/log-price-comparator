import http from './http'
import store from '../store';

let login = store.getters.getRoutes.login;

export default class {

  static login(body){
    return http.post(login.login, body);
  }

  static register(body){
    return http.post(login.register, body);
  }

  // Infelizmente, as vezes o token não é mandado
  static auth(token){
    return http.get(login.auth, {
      headers: { Authorization: token }
    });
  }

}
