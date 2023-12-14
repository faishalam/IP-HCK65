const Axios = require("axios");
const { Article, User } = require("../models");
const apiUrl = 'https://newsapi.org/v2/everything';
const apiKey = '5f2ad5bea3e344529f6e22dfa0bc7638';

class ArticleController {
  static async fetchArticle(req, res) {
    const params = {
      q: 'bitcoin',
      apiKey: apiKey
    };

    try {
      const response = await Axios.get(apiUrl, {
        params: params
      });
      const data = response.data;

      console.log(data, '<<<')

      res.status(200).json(data)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  static async createArticle(req, res) {
    try {
      const { title, description, url, urlToImage, content } = req.body

      const newArticle = await Article.create({ author: req.user.username, title, description, url, urlToImage, content, authorId: req.user.id })

      res.status(201).json(newArticle)
    } catch (error) {
      console.log(error.message)
    }
  }

  static async fetchMyArticles(req, res) {
    try {
      let data = await Article.findAll({
        include: [

          {
            model: User,
            attributes: ["username"]
          }
        ]
      });

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteArticle(req, res) {
    try {
      const { id } = req.params
      console.log(id, 'id articles')
      const authorId = req.user.id
      console.log(authorId, 'userId')

      let data = await Article.findByPk(id)
      if (!data) throw { name: "notFound" }

      if (data.authorId !== authorId) return res.status(401).json({ message: "You are not have permission" })

      await data.destroy()

      res.status(200).json({ message: `success delete` })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async updateArticle(req, res) {
    try {
      const { id } = req.params
      const authorId = req.user.id
      const { title, description, url, urlToImage, content } = req.body

      let data = await Article.findByPk(id)
      if (!data) throw { name: "notFound" }

      if (data.authorId !== authorId) return res.status(401).json({ message: "You are not have permission" })

      await data.update({ title, description, url, urlToImage, content, authorId: authorId });

      res.status(200).json({ message: `lodging with name ${data.name} has been update` })
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getMyArticlesById(req, res) {
    try {
      const { id } = req.params
            
      let data = await Article.findByPk(id)
      //validasi kalo ga ketemu
      if(!data) {
          return res.status(404).json({message : `Id not found!`})
      }
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ArticleController

