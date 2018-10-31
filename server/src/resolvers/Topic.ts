import { TopicResolvers } from '../../generated/graphqlgen'

export const Topic: TopicResolvers.Type = {
  ...TopicResolvers.defaultResolvers,

  parent: parent => {
    throw new Error('Resolver not implemented')
  },
}
