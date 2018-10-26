// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { QueryResolvers } from '../graphqlgen'

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  videos: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
  video: (parent, args) => {
    throw new Error('Resolver not implemented')
  },
  users: parent => {
    throw new Error('Resolver not implemented')
  },
  user: (parent, args) => null,
  me: parent => null,
  topics: parent => {
    throw new Error('Resolver not implemented')
  },
  tags: parent => {
    throw new Error('Resolver not implemented')
  },
}
