const { User, Article } = require("../models");

async function authorization(req, res, next) {
    try {
        const { id } = req.user;

        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user.role)

        
        if (user.role === 'admin') {
            return next();
        } else {
            throw {message : 'You are not have permission!'}
        }

        
        // const article = await Article.findByPk(req.params.id);
        // if (!article) {
        //     return res.status(404).json({ error: 'Lodging not found' });
        // }

        
        // if (user.id === article.authorId) {
        //     return next();
        // } else {
        //     return res.status(403).json({ error: 'Forbidden' });
        // }
    } catch (error) {
        console.log(error)
    }
}

module.exports = authorization;
