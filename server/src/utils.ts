import * as jwt from 'jsonwebtoken'
const bcrypt = require('bcryptjs')

export function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

export const mailjet = require('node-mailjet').connect(
  process.env['MJ_APIKEY_PUBLIC'],
  process.env['MJ_APIKEY_PRIVATE']
)

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export function cryptPassword(password) {
  return bcrypt.hash(password, 10)
}
