const connection = require('./mysql_connection')

module.exports = function(query, callback){

    connection.query(query, function(error, results, fields){
      if(error) {
        callback(error, results)
      } else {
        callback(error, results)
      }
    });
}
