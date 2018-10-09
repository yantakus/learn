import { prisma } from '../generated'

export const AuthPayload = {
  currentUser: async ({ currentUser: { id } }) => {
    return prisma.user({ id })
  },
}
