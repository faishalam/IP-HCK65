const { comparePassword } = require('../helpers/bcrypt');
const {User, Order} = require('../models');
const { signToken, verifyToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client()



class UserController {
    static async register(req, res) {
        try {
            const {username, email, password, role} = req.body
            // console.log(req.body)

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
            

            res.status(200).json({access_token : access_token})
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                return res.status(400).json({message : error.errors[0].message})
            }
            res.status(500).json({message : "Internal server error"})
        }
    }

    static async googleLogin(req, res) {
        try {
            const {google_token} = req.body

            const ticket = await client.verifyIdToken({
                idToken : google_token,
                audience : "256687572511-dvba08opo0f52fb4im5ho9cce4v4gmub.apps.googleusercontent.com"
            })

            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where : {email : payload.email},
                defaults : {
                    username : payload.name,
                    email : payload.email,
                    password: Math.random().toString(),
                    role : "user"
                }
            })

            const access_token = signToken({id : user.id, role: user.role,
                username : user.username})

            res.status(created ? 201 : 200).json({
                "message" : `User ${user.email} not found`,
                "access_token" : access_token,
                "user" : {
                    "name" : user.name
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

   static async upgradeAccount(req, res, next) {
    const userId = req.user.id
    const orderId = req.body.orderId
    console.log(userId, 'masuk')
    try {
        const user = await User.findByPk(userId)
        if(!user) {
            throw {name : "Unauthorized", message : "You are not authorized to upgrade"}
        }
        

        if(user.role === 'admin') {
            return res.json({success : false, message : "Already admin"})
        }

        const order = await Order.findOne({
            where : {
                orderId
            }
        })

        if(!order) {
            throw {name : 'Not Found', message : "No Transaction Found"}
        }

        // const token = Buffer.from("SB-Mid-server-PfxQnJUXtDA8RCzg8qKEtnK2").toString('base64')
        // console.log(token, '<<<< token')

        const url = `https://api.sandbox.midtrans.com/v2/${orderId}/status`
        const options = {
            method : 'GET',
            headers : {
                accept : 'application/json',
                authorization : "Basic " + "U0ItTWlkLXNlcnZlci1QZnhRbkpVWHREQThSQ3pnOHFLRXRuSzI6"
            }
        }

        const { data } = await Axios.get(url, options)
        console.log(data, '<< hacktivvvvv')
        
        if(data.transaction_status === 'capture' && +data.status_code === 200) {
            await order.update({
                status : 'paid',
                paidDate : new Date()
            })

            await user.update({
                role : 'admin'
            })
    
            res.json({message : 'Upgrade account success'})
        } else {
            res.status(400).json({message : 'Transaction is not success'})
        }
    } catch (error) {
        if(error.name === 'Unauthorized') {
            res.status(401).json({message : error.message})
        } else if(error.name === 'NotFound') {
            res.status(404).json({message : error.message})
        } else {
            res.status(500).json({message : `Internal server error`})
        }
    }
   }

   static async fetchUser(req, res) {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes : ['id', 'email', 'role']
        })
        // console.log(user, 'ini dari server')
        res.json(user)
    } catch (error) {
        console.log(error)
    }
   }
}



module.exports = UserController