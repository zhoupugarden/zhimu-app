var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8080"'
  BASE_API: '"http://front-app-service.zimcake.com:8080/zm-mini"'
})
