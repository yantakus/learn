import { TagResolvers } from '../../generated/graphqlgen'

export const Tag: TagResolvers.Type = {
  ...TagResolvers.defaultResolvers,

  parent: parent => {
    throw new Error('Resolver not implemented')
  },
}
