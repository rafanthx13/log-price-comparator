const connection = require('./mysql_connection')

module.exports = function(sqlQry, res){    
  
  connection.query(sqlQry, function(error, results, fields){
    //if (erro) throw error; explorar depois tratar cada erro
    if(error) {
      if(error.code == "ER_DUP_ENTRY"){
        res.status(400);
        res.json({ status: 400, message: "Entrada Duplicada", sqlMessage: error.sqlMessage});
      } else if (error.code == "ER_ROW_IS_REFERENCED_2"){
        res.status(404);
        res.json({ status: 404, message: "Item está referenciado em outra tabela", sqlMessage: error.sqlMessage});
      } else{
        res.status(500);
        res.json(error);
      }
    } else {
      res.json(results);
    }
  });

}
