import { UserResolvers } from '../../generated/graphqlgen'
import { prisma } from '../../generated/prisma'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  videosAdded: ({ id }) => {
    return prisma.videos({ where: { adder: { id } } })
  },
  videosBookmarked: parent => {
    throw new Error('Resolver not implemented')
  },
}
