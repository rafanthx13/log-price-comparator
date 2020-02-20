import Http from './http'

export default class {

  constructor(){
    this.id = 0;
  }

   static getAll(){
    return Http.get('http://localhost:3000/log');
  }

  static post(body){
    return Http.post('http://localhost:3000/log', body);
  }

  static getPosted(body){
    // console.log("dentro do get do LOG", body)
    return Http.post('http://localhost:3000/log/get', body);
  }

}

// INSERT INTO `price_log_bd`.`shop` (`shop_id`, `name`, `cep`, `number`, `street`, `neighbor`, `city`) 
// VALUES ('4', '435', 't', 'gd', 'gd', 'gsd', 'gs');


