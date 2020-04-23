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

  static auth(){
    return http.get(login.auth);
  }

}
