import { prisma } from '../../generated/prisma'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { mailjet, cryptPassword } from '../utils'

export const Mutation = {
  async signup(_parent, { name, email: rawEmail, login, ...args }) {
    const email = rawEmail.toLowerCase().trim()
    const emailExists = await prisma.user({ email })
    if (emailExists) {
      throw new Error('A user with this email already exists.')
    }

    const loginExists = await prisma.user({ login })
    if (loginExists) {
      throw new Error('A user with this login already exists.')
    }

    const password = await cryptPassword(args.password)
    const { id } = await prisma.createUser({
      ...args,
      name,
      email,
      login,
      password,
    })

    const activationCode = await prisma.createAccountActivationCode({
      user: {
        connect: {
          id,
          login,
          email,
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

  async activate(_parent, { activationCode }) {
    const accounts = await prisma.users({
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

    const user = await prisma.updateUser({
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

  async sendResetPasswordEmail(_parent, { login }) {
    let user = await prisma.user({ login })
    if (!user) user = await prisma.user({ email: login })

    if (!user) {
      throw new Error('Wrong login/email.')
    }
    if (!user.isActivated) {
      throw new Error('Your account is not activated.')
    }

    const passwordResetCode = await prisma.createPasswordResetCode({
      user: {
        connect: {
          id: user.id,
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

  async resetPassword(_parent, { passwordResetCode, ...args }) {
    const accounts = await prisma.users({
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

    const user = await prisma.updateUser({
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

  async signin(_parent, { login, password }, ctx, info) {
    let user = await prisma.user({ login })
    if (!user) user = await prisma.user({ email: login })

    if (!user) {
      throw new Error('Wrong login/email.')
    }

    if (!user.isActivated) {
      throw new Error('You should activate your account first.')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Wrong login/email and password combination.')
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    return user
  },

  signout(_parent, _args, ctx) {
    ctx.response.clearCookie('token')
    return { message: 'Goodbye!' }
  },

  async editProfile(_parent, args, ctx) {
    const id = ctx.request.userId
    if (id) {
      const user = await prisma.updateUser({
        where: { id },
        data: { ...args },
      })
      return user
    }
  },
  async addVideo(_parent, args, ctx) {
    const id = ctx.request.userId
    if (id) {
      const videoExists = await prisma.$exists.video({
        ytId: args.ytId,
      })
      if (videoExists) {
        throw new Error(
          'Youtube video with this id already exists in our database.'
        )
      }
      return prisma.createVideo({
        adder: {
          connect: {
            id,
          },
        },
        ...args,
      })
    }
  },
  async bookmarkVideo(_parent, { ytId, adding }, ctx) {
    const videoExists = await prisma.$exists.video({
      ytId,
    })
    if (!videoExists) {
      throw new Error('Sorry, video not found!')
    }
    const id = ctx.request.userId
    return prisma.updateVideo({
      where: {
        ytId,
      },
      data: {
        bookmarkers: {
          [Boolean(adding) ? 'connect' : 'disconnect']: {
            id,
          },
        },
      },
    })
  },
}
