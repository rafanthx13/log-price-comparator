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

  static put(body){
    return http.put(log.put + body.log_id, body);
  }

  static delete(item){
    return http.delete(log.delete  + item.log_id);
  }

  static getPosted(body){
    return http.post(log.getPosted, body);
  }

}
