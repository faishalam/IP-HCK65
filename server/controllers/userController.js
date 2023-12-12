
const { comparePassword } = require('../helpers/bcrypt');
const {User} = require('../models');
const { signToken, verifyToken } = require('../helpers/jwt');

class UserController {
    static async register(req, res) {
        try {
            const {username, email, password, role} = req.body
            console.log(req.body)

            let newUser = await User.create({username, email, password, role})
            const withoutPassword = {
                username: newUser.username,
                email: newUser.email,
              };
            res.status(201).json(withoutPassword)
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                return res.status(400).json({message : error.errors[0].message})
            }
            if(error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({message : error.errors[0].message})
            }
            res.status(500).json({message : "Internal server error"})
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body

            if(!email) {
                res.status(400).json({message : `Email is required`})
                return
            }

            if(!password) {
                res.status(400).json({message : `Password is required`})
                return
            }

            const user = await User.findOne({where : {email}})
            if(!user) {
                res.status(401).json({message : `invalid email/password`})
                return
            }

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword) {
               res.status(401).json({message : `invalid email/password`})
               return
            }
    
            let access_token = signToken({id : user.id, role: user.role})

            res.status(200).json({access_token})
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                return res.status(400).json({message : error.errors[0].message})
            }
            res.status(500).json({message : "Internal server error"})
        }
    }
}



module.exports = UserController