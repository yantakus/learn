import { Prisma, ID_Input } from '../generated/prisma'

export type Overwrite<T1, T2> = { [P in Exclude<keyof T1, keyof T2>]: T1[P] } &
  T2

interface IResponse extends Express.Response {
  cookie: Function
  clearCookie: Function
}

interface IRequest extends Express.Request {
  userId: ID_Input
}

export interface Context {
  data: Prisma
  response: IResponse
  request: IRequest
}
