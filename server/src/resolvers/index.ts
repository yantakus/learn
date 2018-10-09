import { Query } from './Query'
import { auth } from './Mutation/auth'
import { video } from './Mutation/video'
import { AuthPayload } from './AuthPayload'

export = {
  Query,
  Mutation: {
    ...auth,
    ...video,
  },
  AuthPayload,
}
