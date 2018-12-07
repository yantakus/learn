import { prisma } from '../../generated/prisma'
import { VoteResolvers } from '../../generated/graphqlgen'

export const Vote: VoteResolvers.Type = {
  ...VoteResolvers.defaultResolvers,

  parent: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
  user: async ({ id }) => {
    const users = await prisma.users({ where: { votes_some: { id } } })
    return users[0]
  },
}
