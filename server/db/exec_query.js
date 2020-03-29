const connection = require('./mysql_connection')

module.exports = function(sqlQry, res){    
  
  connection.query(sqlQry, function(error, results, fields){
    //if (erro) throw error; explorar depois tratar cada erro
    if(error) {
      connection.end();
      res.status(500);
      res.json(error);
    } else {
      connection.end();
      res.json(results);
    }
  });

}