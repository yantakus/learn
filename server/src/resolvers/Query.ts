import { prisma } from '../../generated/prisma'
import { QueryResolvers } from '../../generated/graphqlgen'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  users(_parent, args) {
    return prisma.users(args)
  },
  user(_parent, args) {
    return prisma.user(args)
  },
  me(_parent, _args, ctx) {
    const id = ctx.request.userId
    if (id) {
      return prisma.user({ id })
    }
    return null
  },
  videos(_parent, args) {
    return prisma.videos(args)
  },
  video(_parent, args) {
    return prisma.video(args)
  },
  topics(_parent, args) {
    return prisma.topics(args)
  },
  tags(_parent, args) {
    return prisma.tags(args)
  },
}
