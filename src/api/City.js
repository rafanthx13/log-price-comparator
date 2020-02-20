import Http from './http'

export default class {

  constructor(){
    this.id = 0;
    this.name = '';
    this.description = '';
    this.sub_item = false;
    this.authority = '';
  }

   static getAll(){
    return Http.get('http://localhost:3000/city');
  }

  static post(body){
    console.log(body);
    return Http.post('http://localhost:3000/city', body);
  }

  static getCities(){
    return Http.get('http://localhost:3000/city/city')
  }

}

/*
import http from '../request/http';
import store from '../store';

export default class{
  constructor(){
    this.id = 0;
    this.name = '';
    this.description = '';
    this.sub_item = false;
    this.authority = '';
  }


  // Usaram store para mudar a BseURL de acordo com o ambiente
  static getAll(){
    return http.get(store.getters.getRoutes.user.roles);
  }

  static getPaginatedRole(numberPage){
    return http.get(store.getters.getRoutes.user.getPaginatedRole + numberPage);
  }
  static getPaginatedRoles(name, numberPage){
    return http.get(store.getters.getRoutes.user.getPaginatedRoles + name + '/' + numberPage);
  }

  static post(body){
    return http.post(store.getters.getRoutes.user.roles, body);
  }

  static delete(id){
    return http.delete(store.getters.getRoutes.user.roles + `/${id}`);
  }

  static put(body){
    return http.put(store.getters.getRoutes.user.roles, body);
  }

}
*/

/*

RETORNA PROMISSE, EXEMPLO:
Role.getPaginatedRole(this.pagination.currentPage - 1)
              .then(result => {
                let result_query = result.data.list;
                this.tableData = result.data.list;
                // Formatando dados booleanos
                for (var index in result_query) {
                  this.tableData[index]["screen"] = result_query[index]["screen"] ? 'Sim' : 'Não'
                  this.tableData[index]["sub_item"] = result_query[index]["sub_item"] ? 'Sim' : 'Não'
                }
                this.pagination.startTotalPages = result.data.totalElements;
                this.flagFirstReload = true;
              })
              .catch(e => {
                swal.fire({
                  title: "Erro na Busca dos Registros",
                  text: "Não foi possível executar a busca dos registros de permissões",
                  type: "error",
                  showConfirmButton: true,
                  timer: 5000
                });
              });
*/