import http from './http'
import store from '../store';

let product = store.getters.getRoutes.product;

export default class {

  static getAll(){
    return http.get(product.getAll);
  }

  static post(body){
    return http.post(product.post, body);
  }

  static put(body){
    return http.put(product.put + body.product_id, body);
  }

  static delete(item){
    return http.delete(product.delete  + item.product_id);
  }

  static getProductsNames(city){
    return http.get(product.getProductsNames + "?city=" + city);
  }

}
