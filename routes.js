const routes = require('next-routes')

module.exports = routes()
  .add('video', '/video/:id')
  .add('user', '/user/:login')
  .add('activate', '/activate/:id')
  .add('reset-password/confirm', '/reset-password/confirm/:id')
  .add('edit', '/video/:ytId/edit')
