const { authSecret } = require('../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs') // comaprar senhas

module.exports = app => {
    // Fazer o login
    const signin = async (req, res) => {
        // validar usuário e senha
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }
        // obtenho o email do banco
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
        // quer dizer que o usuário nao foi encontrado
        if (!user) 
            return res.status(400).send('Usuário não encontrado!')
        // O hash, mesmo gerado com mesma senha, deve ser comparado com esa função
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        // Senha inválida para o Usuário correto
        if (!isMatch) 
            return res.status(401).send('Email/Senha inválidos!')
        // A validade do Token
        const now = Math.floor(Date.now() / 1000) // data em segundos

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, // iat significa issued at : emitido em
            exp: now + (60 * 60 * 24 * 3) 
            // Data de expiração
            // aqui sâo 60s * 60min *24h * 3, dando assim => 3 dias)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    // validar o token por tempo
    const validateToken = async (req, res) => {
        const userData = req.body || null // caso o body nao venha setado, virar como null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token por qualquer outro motivo que nâo sabemod, por isso, vai mandar false
        }

        res.send(false)
    }

    return { signin, validateToken }
}