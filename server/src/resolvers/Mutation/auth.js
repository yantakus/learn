const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../../utils')

const auth = {
  async signup(parent, { email, login, ...args }, ctx, info) {
    const emailExists = await ctx.db.query.user({ where: { email }})
    if (emailExists) {
      throw new Error('A user with this email already exists.')
    }

    const loginExists = await ctx.db.query.user({ where: { login }})
    if (loginExists) {
      throw new Error('A user with this login already exists.')
    }

    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { email, login, password, ...args },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      currentUser: user,
    }
  },

  async signin(parent, { login, password }, ctx, info) {
    let user = await ctx.db.query.user({ where: { login }})
    if (!user) user = await ctx.db.query.user({ where: { email: login }})

    if (!user) {
      throw new Error('Wrong email/password combination.')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Wrong email/password combination.')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      currentUser: user,
    }
  },

  async editProfile(parent, args, ctx, info) {
    const id = getUserId(ctx)
    if (id) {
      const user = await ctx.db.mutation.updateUser({
        where: { id },
        data: { ...args },
      })
      return user
    } else {
      throw new Error('You are not authenticated to perform this action.')
    }
  },
}

module.exports = { auth }
