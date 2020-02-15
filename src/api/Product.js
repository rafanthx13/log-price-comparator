import Http from './http'

export default class {

  constructor(){
    this.id = 0;
  }

   static getAll(){
    return Http.get('http://localhost:3000/product');
  }

  static post(body){
    return Http.post('http://localhost:3000/product', body);
  }

  static getProductsNames(){
    return Http.get('http://localhost:3000/product/name');
  }

}

// INSERT INTO `price_log_bd`.`shop` (`shop_id`, `name`, `cep`, `number`, `street`, `neighbor`, `city`) 
// VALUES ('4', '435', 't', 'gd', 'gd', 'gsd', 'gs');


