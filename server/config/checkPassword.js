var mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function(user, password, API_SECRET, res){
  
    const connection = mysql.createConnection({
      host     : '127.0.0.1',
      port     :  3306,
      user     : 'root',
      password : 'root',
      database : 'price_log_bd'
    });

    query = `SELECT * FROM user WHERE user_name = '${user}' LIMIT 1`;
  
    connection.query(query, function(error, results, fields){
      if(error) {
        res.status(401).send({ auth: false, token: null });
      } else {
        if( results.length > 0){
          let passwordIsValid = bcrypt.compareSync(password, results[0].password);
          if (passwordIsValid){ 
            let token = jwt.sign({ id: results[0].id }, API_SECRET, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
          } else {
            res.status(401).send({ auth: false, token: null });
          }
        }else {
          res.status(401).json({ auth: false, token: null});
        }
      }
    });
}
