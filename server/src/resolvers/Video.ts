import { prisma } from '../../generated/prisma'
import { VideoResolvers } from '../../generated/graphqlgen'
const fetch = require('node-fetch')
import { get } from 'lodash'

export const Video: VideoResolvers.Type = {
  ...VideoResolvers.defaultResolvers,

  language: async ({ id }) => {
    const language = await prisma.languages({ where: { parent_some: { id } } })
    return language[0]
  },
  topics: ({ id }) => {
    return prisma.topics({ where: { parent_some: { id } } })
  },
  tags: ({ id }) => {
    return prisma.tags({ where: { parent_some: { id } } })
  },
  adder: async ({ id }) => {
    const users = await prisma.users({ where: { videosAdded_some: { id } } })
    return users[0]
  },
  bookmarkers: ({ id }) => {
    return prisma.users({ where: { videosBookmarked_some: { id } } })
  },
  snippet: async parent => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${
        process.env.YOUTUBE_API_KEY
      }&part=snippet&id=${parent.ytId}`
    )
    if (!response.ok) {
      throw new Error(response.status)
    }
    const result = await response.json()
    if (!result) {
      throw new Error('Something went wrong when fetching snippet')
    }
    const snippet = get(result, ['items', 0, 'snippet'])
    return snippet
  },
  votes: ({ id }) => {
    return prisma.votes({ where: { parent: { id } } })
  },
}
