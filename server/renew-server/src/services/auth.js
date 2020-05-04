const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { API_SECRET } = require('../env/env.config.js')

module.exports = (app) => {

		const signin = async (req, res) => {
			const user = await app.db('user').where({ user_name: req.body.user_name }).select().first();
			
			if(!user){
				res.status(401).send({ auth: false, token: null, message: "User Invalid" });
			}

			// compara senhas
			if(bcrypt.compareSync(req.body.password, user.password)){
				let payload = { id: user.id, password: user.password }
				let jwtOptions = { expiresIn: '24h' } // expires in 24 hours
				let token = jwt.sign(payload, API_SECRET, jwtOptions);
        res.status(200).send({ auth: true, token: token, user_type: user.user_type });
			} else {
				res.status(401).send({ auth: false, token: null, message: "Fail in JWT Validation" });
			}

		};

		const authenticate = (req, res, next) => {
			let token = req.headers['authorization'];
			if (!token) 
			  return res.status(401).send({ auth: false, message: 'No token provided.' });
			jwt.verify(token, API_SECRET, function(err, decoded) {
			  if (err) 
			    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
			  res.status(200).send(decoded); // pode tirar esse decode, nao vou usar pra nada
			});
		};

		return { signin, authenticate };
}
/*
{
    "user_name" : "tami3",
  	"password": "tami3"
}

resul RowDataPacket {
  id: 8,
  user_name: 'tami3',
  email: 'rafa3@gmail.com',
  password:
   '$2b$10$kuh9gGWVAi1VnNfRqVy7peO/aF1e9HbqF4.QKQ7hatng1rpZhm76i',
  user_type: 'admin' }


*/