const { GraphQLServer } = require('graphql-yoga')
import { prisma } from './generated'
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db: prisma }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

const options = {
  debug: true,
}

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
)
