import Http from './http'

export default class {

  constructor(){
    this.id = 0;
  }

   static getAll(){
    return Http.get('http://localhost:3000/shop');
  }

  static post(body){
    return Http.post('http://localhost:3000/shop', body);
  }

  static getShopsNames(){
    return Http.get('http://localhost:3000/shop/name');
  }

  static getShopsByCity(city_name){
    console.log('http://localhost:3000/shop/city?city_name=' + city_name)
    return Http.get('http://localhost:3000/shop/city?city_name=' + city_name);
  }

}

// INSERT INTO `price_log_bd`.`shop` (`shop_id`, `name`, `cep`, `number`, `street`, `neighbor`, `city`) 
// VALUES ('4', '435', 't', 'gd', 'gd', 'gsd', 'gs');


