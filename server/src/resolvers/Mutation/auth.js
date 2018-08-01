const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    const valid = await bcrypt.compare(password, user.password)

    if (!user || !valid) {
      throw new Error('Wrong email/password combination.')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}

module.exports = { auth }
