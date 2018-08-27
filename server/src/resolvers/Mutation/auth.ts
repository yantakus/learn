const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../../utils')

const auth = {
  async signup(parent, { name, email, login, ...args }, ctx) {
    const emailExists = await ctx.db.query.user({ where: { email } })
    if (emailExists) {
      throw new Error('A user with this email already exists.')
    }

    const loginExists = await ctx.db.query.user({ where: { login } })
    if (loginExists) {
      throw new Error('A user with this login already exists.')
    }

    const password = await bcrypt.hash(args.password, 10)
    const { id } = await ctx.db.mutation.createUser({
      data: { name, email, login, password, ...args },
    })

    const activationCode = await ctx.db.mutation.createAccountActivationCode({
      data: {
        user: {
          connect: {
            id,
            login,
            email,
          },
        },
      },
    })

    try {
      const ACTIVATION_URL = process.env['ACCOUNT_ACTIVATION_URL']
      const activationUrl = `${ACTIVATION_URL}/${activationCode.id}`

      const mailjet = require('node-mailjet').connect(
        process.env['MJ_APIKEY_PUBLIC'],
        process.env['MJ_APIKEY_PRIVATE']
      )
      const request = mailjet.post('send').request({
        FromEmail: 'takushevich@gmail.com',
        FromName: 'Yan Takushevich',
        Recipients: [{ Email: email }],
        Subject: 'Activate your account',
        'Text-part': `Click on the link below to activate your account:

        ${activationUrl}

        Thank you,
        Reko team.

        If you never signed up to Reko immediately email us at support@reko.by.`,
      })
      const result = await request
        .then(() => {
          return {
            result: true,
            message: 'Please, check your email to activate your account.',
          }
        })
        .catch(err => {
          console.log(err.statusCode)
          return {
            result: false,
            error: 'Failed to send email.',
          }
        })
      console.log(result)
      return result
    } catch (e) {
      console.log(e)
      return {
        result: false,
        error:
          'An unexpected error occured during creation of activation code.',
      }
    }
  },

  async activate(parent, { activationCode }, ctx) {
    const accounts = await ctx.db.query.users({
      where: {
        activationCode: {
          id: activationCode,
        },
      },
    })
    const account = accounts[0]
    if (!account) {
      throw new Error("Activation code doesn't exist.")
    }
    if (account.isActivated) {
      throw new Error('Account is already activated.')
    }

    const user = await ctx.db.mutation.updateUser({
      where: {
        id: account.id,
      },
      data: { isActivated: true },
    })

    if (user) {
      return {
        result: true,
        message: 'Your account is successfully activated. Now you can sign in.',
      }
    } else {
      return {
        result: false,
        error: 'Unexpected error during account activation.',
      }
    }
  },

  async signin(parent, { login, password }, ctx) {
    let user = await ctx.db.query.user({ where: { login } })
    if (!user) user = await ctx.db.query.user({ where: { email: login } })

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

  async editProfile(parent, args, ctx) {
    const id = getUserId(ctx)
    if (id) {
      const user = await ctx.db.mutation.updateUser({
        where: { id },
        data: { ...args },
      })
      return user
    } else {
      throw new Error('You are not authenticated to perform this action.')
    }
  },
}

module.exports = { auth }
