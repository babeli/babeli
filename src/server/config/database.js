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
module.exports = require('./database.json');
