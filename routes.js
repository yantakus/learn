const routes = require('next-routes')

module.exports = routes()
  .add('meetup', '/meetup/:id')
  .add('user', '/user/:login')
