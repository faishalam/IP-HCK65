const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models");

async function authentication(req, res, next) {
    try {
        let token = req.headers.authorization
        
        if(!token) throw {name : `InvalidToken`}
        if(token.slice(0, 7) !== 'Bearer ') throw {name: `InvalidToken`}
        
        token = token.slice(7)
        let payload = verifyToken(token)
        
        let user = await User.findByPk(payload.id)
        if(!user) throw {name: `InvalidToken`}

        req.user = {
            id : user.id,
            role: user.role,
            username : user.username
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = authentication 