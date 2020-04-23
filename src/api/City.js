import Http from './http'
import store from '../store';

let city = store.getters.getRoutes.city;

export default class {

  static getAll(){
    return Http.get(city.getAll);
  }

  static post(body){
    return Http.post(city.post, body);
  }

  static getCities(){
    return Http.get(city.getCities)
  }

}
