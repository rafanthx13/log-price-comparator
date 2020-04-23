const connection = require('./mysql_connection')

module.exports = function(sqlQry, res){    
  
  connection.query(sqlQry, function(error, results, fields){
    //if (erro) throw error; explorar depois tratar cada erro
    if(error) {
      res.status(500);
      res.json(error);
    } else {
      res.json(results);
    }
  });

}