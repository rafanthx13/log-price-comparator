import http from './http'
import store from '../store';

let log = store.getters.getRoutes.log;

export default class {

  static getAll(){
    return http.get(log.getAll);
  }

  static post(body){
    return http.post(log.post, body);
  }

  static getPosted(body){
    return http.post(log.getPosted, body);
  }

}


