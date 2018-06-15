require('babel-core/register')({
  presets: [
    [
      'env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    'transform-export-extensions',
    'transform-object-rest-spread',
    'transform-decorators-legacy',
    [
      'transform-class-properties',
      {
        spec: true,
      },
    ],
  ],
});

const config = require('./database.json');

const env = process.env.NODE_ENV || 'development';
config[env].operatorsAliases = require('sequelize').Sequelize.Op;

module.exports = config;
