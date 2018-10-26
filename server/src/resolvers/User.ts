import { prisma } from '../../generated/prisma'

export const User = {
  videosAdded: ({ id }) => {
    return prisma.videos({ where: { adder: { id } } })
  },
  videosBookmarked: parent => {
    throw new Error('Resolver not implemented')
  },
}
