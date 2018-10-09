import { getUserId } from '../utils'
import { prisma } from '../generated'

export const Query = {
  users() {
    return prisma.users({ orderBy: 'name_DESC' })
  },
  user(_parent, { login }) {
    return prisma.user({ login })
  },
  currentUser(_parent, _args, ctx) {
    const id = getUserId(ctx)
    return prisma.user({ id })
  },
  videos(_parent, { skip, first }) {
    return prisma.videos({
      skip,
      first,
    })
  },
  video(_parent, { ytId }) {
    return prisma.video({ ytId })
  },
  topics() {
    return prisma.topics({})
  },
  tags() {
    return prisma.tags({})
  },
}
