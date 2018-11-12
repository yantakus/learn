import { UserResolvers } from '../../generated/graphqlgen'
import { prisma } from '../../generated/prisma'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  videosAdded: ({ id }) => {
    return prisma.videos({
      orderBy: 'createdAt_DESC',
      where: { adder: { id } },
    })
  },
  videosBookmarked: ({ id }) => {
    return prisma.videos({
      orderBy: 'createdAt_DESC',
      where: { bookmarkers_some: { id } },
    })
  },
}
