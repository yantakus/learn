import { prisma } from '../../generated/prisma'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { mailjet, cryptPassword } from '../utils'
import { MutationResolvers } from '../../generated/graphqlgen'
import { AuthError } from '../utils'
import { BONUSES } from '../constants'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

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
      await prisma.updateUser({
        where: {
          id: user.id,
        },
        data: { rank: user.rank + BONUSES.SIGN_UP },
      })
      return {
        message: `Your account is successfully activated. You've been granted ${
          BONUSES.SIGN_UP
        } rank points. Now you can sign in.`,
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

  async upsertVideo(_parent, { update, ...args }, ctx) {
    const userId = ctx.request.userId
    if (userId) {
      if (args.ytId.length !== 11) {
        throw new Error('Incorrect youtube video id.')
      }
      const fragment = `
        fragment UserWithAdder on User {
          id
          adder {
            id
          }
        }
        `
      const videos = await prisma
        .videos({
          where: { ytId: args.ytId },
        })
        .$fragment(fragment)

      const video = videos[0]

      if (update) {
        if (video) {
          const user = await prisma.user({ id: userId })
          if (
            user.role === 'ADMIN' ||
            user.role === 'EDITOR' ||
            userId === video.adder.id
          ) {
            return prisma.updateVideo({
              where: {
                id: video.id,
              },
              data: {
                ...args,
              },
            })
          } else {
            throw new Error(
              "You are trying to edit another user's video and you have insufficient permissions to do this."
            )
          }
        } else {
          throw new Error('You are trying to update inexisting video.')
        }
      } else {
        if (video) {
          throw new Error(
            'Youtube video with this id already exists in our database.'
          )
        }

        // grant user points for adding video
        const user = await prisma.user({ id: userId })
        await prisma.updateUser({
          where: {
            id: user.id,
          },
          data: { rank: user.rank + BONUSES.ADD_VIDEO },
        })
        return prisma.createVideo({
          adder: {
            connect: {
              id: userId,
            },
          },
          ...args,
        })
      }
    } else {
      throw new AuthError()
    }
  },

  async bookmarkVideo(_parent, { id, adding }, ctx) {
    const videoExists = await prisma.$exists.video({
      id,
    })
    if (!videoExists) {
      throw new Error('Sorry, video not found!')
    }
    const userId = ctx.request.userId
    return prisma.updateVideo({
      where: {
        id,
      },
      data: {
        bookmarkers: {
          [Boolean(adding) ? 'connect' : 'disconnect']: {
            id: userId,
          },
        },
      },
    })
  },

  async voteVideo(_parent, { id, type, adding }, ctx) {
    const userId = ctx.request.userId
    if (!userId) {
      throw new AuthError()
    }

    let existingVideo = await prisma.video({ id })
    if (!existingVideo) {
      throw new Error(`Video with id: ${id} doesn't exist.`)
    }

    const existingVotes = await prisma.votes({
      where: { user: { id: userId }, parent: { id } },
    })
    const existingVote = existingVotes[0]

    if (adding && existingVote) {
      if (existingVote.type === type) {
        throw new Error(`You already have ${type} vote for this video`)
      } else {
        await prisma.deleteManyVotes({
          parent: {
            id,
          },
          user: {
            id: userId,
          },
        })
        await prisma.updateVideo({
          where: { id: existingVideo.id },
          data: {
            voteScore:
              existingVote.type === 'UP'
                ? existingVideo.voteScore - 1
                : existingVideo.voteScore + 1,
          },
        })
        existingVideo = await prisma.video({ id })
      }
    }

    const mutation = {
      where: {
        id,
      },
      data: {},
    }

    if (adding) {
      mutation.data = {
        votes: {
          create: {
            type,
            user: {
              connect: { id: userId },
            },
          },
        },
        voteScore:
          type === 'UP'
            ? existingVideo.voteScore + 1
            : existingVideo.voteScore - 1,
      }
    } else {
      if (!existingVote) {
        throw new Error(`You you are trying to delete inexisting vote`)
      }
      mutation.data = {
        votes: {
          delete: {
            id: existingVote.id,
          },
        },
        voteScore:
          type === 'UP'
            ? existingVideo.voteScore - 1
            : existingVideo.voteScore + 1,
      }
    }

    return prisma.updateVideo(mutation)
  },
}
