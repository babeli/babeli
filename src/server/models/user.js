import bcrypt from 'bcrypt';
import hat from 'hat';

import { AuthenticationFailed } from '../errors';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
    },
  }, { sequelize });

  User.hook('beforeValidate', user => new Promise((resolve, reject) => {
    /* istanbul ignore next line */
    if (!user.apiKey) {
      user.apiKey = hat(256);
    }

    if (user.password) {
      bcrypt.hash(user.password, 10, (error, hash) => {
        /* istanbul ignore next line */
        if (error) {
          reject(error);
        } else {
          user.encryptedPassword = hash;
          resolve();
        }
      });
    } else {
      resolve();
    }
  }));

  User.authenticate = (email, password) => new Promise((resolve, reject) => {
    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.encryptedPassword, (error, response) => {
          if (!error && response) {
            resolve(user);
          } else {
            reject(new AuthenticationFailed());
          }
        });
      } else {
        reject(new AuthenticationFailed());
      }
    });
  });

  User.prototype.toSessionJson = function () {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  };

  return User;
}
