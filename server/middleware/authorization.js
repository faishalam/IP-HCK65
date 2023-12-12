const { User, Article } = require("../models");

async function authorization(req, res, next) {
    try {
        const { id } = req.user;

        // Periksa apakah pengguna ditemukan
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Jika pengguna adalah admin, berikan akses
        if (user.role === 'admin') {
            return next();
        }

        // Periksa izin akses pengguna ke lodging
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Lodging not found' });
        }

        // Jika pengguna adalah pemilik lodging, berikan akses
        if (user.id === article.authorId) {
            return next();
        } else {
            return res.status(403).json({ error: 'Forbidden' });
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = authorization;
