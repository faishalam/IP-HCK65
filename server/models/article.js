'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, {foreignKey: "authorId"})
    }
  }
  Article.init({
    author: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'Author is required'
        },
        notEmpty : {
          msg : 'Author is required'
        }
      }
    },
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'Title is required'
        },
        notEmpty : {
          msg : 'Title is required'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'description is required'
        },
        notEmpty : {
          msg : 'description is required'
        }
      }
    },
    url: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'url is required'
        },
        notEmpty : {
          msg : 'url is required'
        }
      }
    },
    urlToImage: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'Image is required'
        },
        notEmpty : {
          msg : 'Image is required'
        }
      }
    },
    publishedAt: {
      type : DataTypes.DATE,
      defaultValue : new Date()
    },   
    content: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'content is required'
        },
        notEmpty : {
          msg : 'content is required'
        }
      }
    },
    authorId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'is required'
        },
        notEmpty : {
          msg : 'is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};