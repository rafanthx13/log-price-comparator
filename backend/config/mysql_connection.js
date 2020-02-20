var mysql = require('mysql');

module.exports = function(sqlQry, res){
  
    const connection = mysql.createConnection({
      host     : '127.0.0.1',
      port     :  3306,
      user     : 'root',
      password : 'root',
      database : 'price_log_bd'
    });
  
    connection.query(sqlQry, function(error, results, fields){
      if(error) {
        res.status(500);
        res.json(error);
      } else {
        res.json(results);
	console.log(results);
        connection.end();
      }
    });
}
//
