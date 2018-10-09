import { getUserId } from '../../utils'
import { prisma } from '../../generated'

export const video = {
  async addVideo(_parent, args, ctx) {
    const videoExists = await prisma.$exists.video({
      ytId: args.ytId,
    })
    if (videoExists) {
      throw new Error(
        'Youtube video with this id already exists in our database.'
      )
    }
    const userId = getUserId(ctx)
    return prisma.createVideo({
      adder: {
        connect: {
          id: userId,
        },
      },
      ...args,
    })
  },
  async bookmarkVideo(_parent, { ytId, adding }, ctx) {
    const videoExists = await prisma.$exists.video({
      ytId,
    })
    if (!videoExists) {
      throw new Error('Sorry, video not found!')
    }
    const userId = getUserId(ctx)
    return prisma.updateVideo({
      where: {
        ytId,
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
}
