const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, mailjet, cryptPassword } = require('../../utils')

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

    const password = await cryptPassword(args.password)
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

      const request = mailjet.post('send').request({
        FromEmail: 'takushevich@gmail.com',
        FromName: 'Reko team',
        Recipients: [{ Email: email }],
        Subject: 'Activate your account',
        'Text-part': `Click on the link below to activate your account:

        ${activationUrl}

        Thank you,
        Reko team.

        If you never signed up to Reko just ignore this email.`,
      })
      const result = await request
        .then(() => {
          return {
            message: 'Please, check your email to activate your account.',
          }
        })
        .catch(err => {
          console.error(err.statusCode)
          throw new Error('Failed to send email.')
        })
      return result
    } catch (e) {
      console.error(e)
      throw new Error(
        'An unexpected error occured during creation of activation code.'
      )
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
        message: 'Your account is successfully activated. Now you can sign in.',
      }
    } else {
      throw new Error('Unexpected error during account activation.')
    }
  },

  async sendResetPasswordEmail(parent, { login }, ctx) {
    let user = await ctx.db.query.user({ where: { login } })
    if (!user) user = await ctx.db.query.user({ where: { email: login } })

    if (!user) {
      throw new Error('Wrong login/email.')
    }
    if (!user.isActivated) {
      throw new Error('Your account is not activated.')
    }

    const passwordResetCode = await ctx.db.mutation.createPasswordResetCode({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    try {
      const RESET_PASSWORD_URL = process.env['RESET_PASSWORD_URL']
      const resetPasswordUrl = `${RESET_PASSWORD_URL}/${passwordResetCode.id}`

      const request = mailjet.post('send').request({
        FromEmail: 'takushevich@gmail.com',
        FromName: 'Reko team',
        Recipients: [{ Email: user.email }],
        Subject: 'Reset password',
        'Text-part': `Click on the link below to reset your password:

        ${resetPasswordUrl}

        Thank you,
        Reko team.

        If you never requested password reset, just ignore this email.`,
      })
      const result = await request
        .then(() => {
          return {
            message: 'Please, check your email to reset password.',
          }
        })
        .catch(err => {
          console.error(err)
          throw new Error('Failed to send email.')
        })
      return result
    } catch (e) {
      console.error(e)
      throw new Error(
        'An unexpected error occured during creation of reset password code.'
      )
    }
  },

  async resetPassword(parent, { passwordResetCode, ...args }, ctx) {
    const accounts = await ctx.db.query.users({
      where: {
        passwordResetCode: {
          id: passwordResetCode,
        },
      },
    })
    const account = accounts[0]
    if (!account) {
      throw new Error("Reset password code doesn't exist.")
    }

    const password = await cryptPassword(args.password)

    const user = await ctx.db.mutation.updateUser({
      where: {
        id: account.id,
      },
      data: { password },
    })

    if (user) {
      return {
        message: 'Your password has been successfully changed.',
      }
    } else {
      throw new Error('Unexpected error during reset password.')
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
