const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models");

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.authorization
        console.log(access_token)

        
        if(access_token == 'undefined') {
            throw {message : "invalid token"}
        }
        if(access_token.slice(0, 7) !== 'Bearer ') throw {message: `InvalidToken`}
        
        
        // access_token = access_token.slice(7)
        
        let payload = verifyToken(access_token)
        
        let user = await User.findByPk(payload.id)
        if(!user) throw {message: `InvalidToken`}

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