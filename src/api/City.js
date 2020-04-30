import http from './http'
import store from '../store';

let city = store.getters.getRoutes.city;

export default class {

  static getAll(){
    return http.get(city.getAll);
  }

  static post(body){
    return http.post(city.post, body);
  }

  static put(body){
    return http.put(city.put + body.city_id, body);
  }

  static delete(item){
    return http.delete(city.delete  + item.city_id);
  }

  static getCities(){
    return http.get(city.getCities)
  }

}
