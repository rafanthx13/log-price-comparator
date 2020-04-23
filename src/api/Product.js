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

  static getProductsNames(){
    return http.get(product.getProductsNames);
  }

}

// INSERT INTO `price_log_bd`.`shop` (`shop_id`, `name`, `cep`, `number`, `street`, `neighbor`, `city`) 
// VALUES ('4', '435', 't', 'gd', 'gd', 'gsd', 'gs');
