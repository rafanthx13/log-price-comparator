// esse middelwre de entrada é a cadeia de middlware
module.exports = middleware => {
		// é uma middleware, se tiver admin, continua os middlewzre
    return (req, res, next) => {
        if(req.user.admin) {
            middleware(req, res, next)
        } else {
        		// caso corntrtio, sai
            res.status(401).send('Usuário não é administrador.')
        }
    }
}