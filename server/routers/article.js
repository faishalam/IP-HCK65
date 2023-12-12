const express = require('express')
const ArticleController = require('../controllers/articleController')
const authentication = require('../middleware/authenctication')
const authorization = require('../middleware/authorization')
const articleRouter = express()

articleRouter.use(authentication)
articleRouter.get("/", ArticleController.fetchArticle)
articleRouter.post("/articles", authorization, ArticleController.createArticle)
articleRouter.delete("/articles/:id", authorization, ArticleController.deleteArticle)
articleRouter.put("/articles/:id", authorization, ArticleController.updateArticle)

module.exports = articleRouter