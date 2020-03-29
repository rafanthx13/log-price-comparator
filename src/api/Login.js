import Http from './http'

export default class {

  constructor(){
    this.id = 0;
  }

  static login(body){
    return Http.post('http://localhost:3000/login', body);
  }

  static register(body){
    return Http.post('http://localhost:3000/register', body);
  }

  static auth(){
    return Http.get('http://localhost:3000/auth');
  }

}
