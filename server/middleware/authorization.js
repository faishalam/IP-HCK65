const { User, Article } = require("../models");

async function authorization(req, res, next) {
    try {
        const { id } = req.user;

        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user)


        if (user.role === 'admin') {
            return next();
        } else {
            throw {message : 'You are not have permission!'}
        }
    
    } catch (error) {
        console.log(error)
    }
}

module.exports = authorization;
