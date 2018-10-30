import { prisma } from '../../generated/prisma'

export const Video = {
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
  snippet: parent => {
    throw new Error('Snippet Resolver not implemented')
  },
}
