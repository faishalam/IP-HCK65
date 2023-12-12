const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY

const signToken = (payload) => {
    return jwt.sign(payload, "secret")
}

const verifyToken = (token) => {
    return jwt.verify(token, "secret")
}

module.exports = {
    signToken,
    verifyToken
}