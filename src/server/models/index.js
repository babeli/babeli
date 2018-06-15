import Sequelize from 'sequelize';
import user from './user';

/* istanbul ignore next line */
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/database.json`)[env];
config.operatorsAliases = Sequelize.Op;
config.logging = false;

/* istanbul ignore next line */
const sequelize = config.use_env_variable ?
  new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

export const User = user(sequelize, Sequelize.DataTypes);

const db = {
  User,
  sequelize,
  Sequelize,
};

export default db;
