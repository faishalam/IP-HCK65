'use strict';

const {
  Model
} = require('sequelize');
const { genSalt } = require('../helpers/bcrypt');
const { sendEmail } = require('../helpers/nodeMailer');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article, {foreignKey : "authorId"})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Username is required'
        },
        notEmpty : {
          msg : 'Username is required'
        },
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : `Email already registered`
      },
      validate : {
        notEmpty : {
          msg : 'Email is required'
        },
        notEmpty : {
          msg : 'Email is required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Password is required'
        },
        notEmpty : {
          msg : 'Password is required'
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      defaultValue : 'user'
    }
  }, {
    hooks : {
      beforeCreate(instance, option) {
        instance.password = genSalt(instance.password)
      },
      afterCreate(instance, option) {
        sendEmail(instance.email)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};