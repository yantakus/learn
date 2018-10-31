import { prisma } from '../../generated/prisma'
import { VideoResolvers } from '../../generated/graphqlgen'
import { Overwrite } from '../types'

type IVideoResolvers = Overwrite<
  VideoResolvers.Type,
  {
    snippet?: any // exclude snippet so that we can include remote data as snippet in Videos resolver
  }
>

export const Video: IVideoResolvers = {
  ...VideoResolvers.defaultResolvers,

  topics: ({ id }, args) => {
    return prisma.topics({ where: { parent: { id } } })
  },
  tags: ({ id }, args) => {
    return prisma.tags({ where: { parent: { id } } })
  },
  adder: parent => {
    throw new Error('Resolver not implemented')
  },
  bookmarkers: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
}
