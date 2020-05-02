import http from './http';
import store from '../store';

let shop = store.getters.getRoutes.shop;

export default class {

  static getAll(){
    return http.get(shop.getAll);
  }

  static post(body){
    return http.post(shop.post, body);
  }

  static put(body){
    return http.put(shop.put + body.product_id, body);
  }

  static delete(item){
    return http.delete(shop.delete  + item.product_id);
  }

  static getShopsNames(){
    return http.get(shop.getShopsNames);
  }

  static getShopsByCity(city_name){
    return http.get(shop.getShopsByCity + city_name);
  }

}
