const bcrypt = require('bcryptjs')

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
