const connection = require('./mysql_connection')

module.exports = function(query, callback){

    connection.query(query, function(error, results, fields){
      connection.end();
      if(error) {
        callback(error, results)
      } else {
        callback(error, results)
      }
    });
}
