const { GraphQLServer } = require('graphql-yoga')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

import { prisma } from '../generated/prisma'
import { resolvers } from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db: prisma }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

server.express.use(cookieParser())

// decode the JWT so we can get the user Id on each request
server.express.use((req, _res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // put the userId onto the req for future requests to access
    req.userId = userId
  }
  next()
})

// 2. Create a middleware that populates the user on each request

server.express.use(async (req, _res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next()
  const user = await prisma.user({ id: req.userId })
  req.user = user
  next()
})

const options = {
  debug: true,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}

server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
)
