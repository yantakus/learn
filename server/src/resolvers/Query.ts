const fetch = require('node-fetch')
import { prisma } from '../../generated/prisma'
import { find } from 'lodash'

export const Query = {
  users(_parent, args) {
    return prisma.users(args)
  },
  user(_parent, args) {
    return prisma.user(args)
  },
  me(_parent, _args, ctx) {
    const id = ctx.request.userId
    if (id) {
      return prisma.user({ id })
    }
    return null
  },
  async videos(_parent, args) {
    const videos = await prisma.videos(args)
    const ytIds = videos.map(i => i.ytId)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${
        process.env.YOUTUBE_API_KEY
      }&part=snippet&id=${ytIds.join()}`
    )
    if (!response.ok) {
      throw new Error(response.status)
    }
    const ytVideos = await response.json()
    const combinedData = videos.map(i => {
      const { snippet } = find(ytVideos.items, o => o.id === i.ytId)
      return {
        ...i,
        snippet,
      }
    })
    return combinedData
  },
  video(_parent, args) {
    return prisma.video(args)
  },
  topics(_parent, args) {
    return prisma.topics(args)
  },
  tags(_parent, args) {
    return prisma.tags(args)
  },
}
