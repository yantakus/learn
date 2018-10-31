// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../src/types'
import { User } from './prisma'
import { Video } from './prisma'
import { Topic } from './prisma'
import { Tag } from './prisma'
import { Payload } from './prisma'
import { Complexity } from './prisma'

export namespace QueryResolvers {
  export const defaultResolvers = {}

  export interface ArgsVideos {
    skip: number | null
    first: number | null
  }

  export interface ArgsVideo {
    id: string
  }

  export interface ArgsUser {
    login: string
  }

  export type VideosResolver = (
    parent: {},
    args: ArgsVideos,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video[] | Promise<Video[]>

  export type VideoResolver = (
    parent: {},
    args: ArgsVideo,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video | Promise<Video>

  export type UsersResolver = (
    parent: {},
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>

  export type UserResolver = (
    parent: {},
    args: ArgsUser,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | null | Promise<User | null>

  export type MeResolver = (
    parent: {},
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | null | Promise<User | null>

  export type TopicsResolver = (
    parent: {},
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Topic[] | Promise<Topic[]>

  export type TagsResolver = (
    parent: {},
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Tag[] | Promise<Tag[]>

  export interface Type {
    videos: (
      parent: {},
      args: ArgsVideos,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video[] | Promise<Video[]>

    video: (
      parent: {},
      args: ArgsVideo,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video | Promise<Video>

    users: (
      parent: {},
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>

    user: (
      parent: {},
      args: ArgsUser,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | null | Promise<User | null>

    me: (
      parent: {},
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | null | Promise<User | null>

    topics: (
      parent: {},
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Topic[] | Promise<Topic[]>

    tags: (
      parent: {},
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Tag[] | Promise<Tag[]>
  }
}

export namespace MutationResolvers {
  export const defaultResolvers = {}

  export interface TopicCreateManyWithoutParentInput {
    create: string
    connect: string
  }
  export interface TagCreateManyWithoutParentInput {
    create: string
    connect: string
  }

  export interface ArgsSignup {
    email: string
    password: string
    login: string
    name: string
  }

  export interface ArgsActivate {
    activationCode: string
  }

  export interface ArgsSendResetPasswordEmail {
    login: string
  }

  export interface ArgsResetPassword {
    passwordResetCode: string
    password: string
  }

  export interface ArgsSignin {
    login: string
    password: string
  }

  export interface ArgsEditProfile {
    name: string | null
    login: string | null
  }

  export interface ArgsAddVideo {
    ytId: string
    complexity: Complexity
    topics: TopicCreateManyWithoutParentInput
    tags: TagCreateManyWithoutParentInput
  }

  export interface ArgsBookmarkVideo {
    id: string
    adding: boolean
  }

  export type SignupResolver = (
    parent: {},
    args: ArgsSignup,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Payload | Promise<Payload>

  export type ActivateResolver = (
    parent: {},
    args: ArgsActivate,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Payload | Promise<Payload>

  export type SendResetPasswordEmailResolver = (
    parent: {},
    args: ArgsSendResetPasswordEmail,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Payload | Promise<Payload>

  export type ResetPasswordResolver = (
    parent: {},
    args: ArgsResetPassword,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Payload | Promise<Payload>

  export type SigninResolver = (
    parent: {},
    args: ArgsSignin,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>

  export type SignoutResolver = (
    parent: {},
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Payload | Promise<Payload>

  export type EditProfileResolver = (
    parent: {},
    args: ArgsEditProfile,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>

  export type AddVideoResolver = (
    parent: {},
    args: ArgsAddVideo,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video | Promise<Video>

  export type BookmarkVideoResolver = (
    parent: {},
    args: ArgsBookmarkVideo,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video | Promise<Video>

  export interface Type {
    signup: (
      parent: {},
      args: ArgsSignup,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Payload | Promise<Payload>

    activate: (
      parent: {},
      args: ArgsActivate,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Payload | Promise<Payload>

    sendResetPasswordEmail: (
      parent: {},
      args: ArgsSendResetPasswordEmail,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Payload | Promise<Payload>

    resetPassword: (
      parent: {},
      args: ArgsResetPassword,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Payload | Promise<Payload>

    signin: (
      parent: {},
      args: ArgsSignin,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>

    signout: (
      parent: {},
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Payload | Promise<Payload>

    editProfile: (
      parent: {},
      args: ArgsEditProfile,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>

    addVideo: (
      parent: {},
      args: ArgsAddVideo,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video | Promise<Video>

    bookmarkVideo: (
      parent: {},
      args: ArgsBookmarkVideo,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video | Promise<Video>
  }
}

export namespace UserResolvers {
  export const defaultResolvers = {
    id: (parent: User) => parent.id,
    isActivated: (parent: User) =>
      parent.isActivated === undefined ? null : parent.isActivated,
    login: (parent: User) => parent.login,
    email: (parent: User) => parent.email,
    name: (parent: User) => parent.name,
  }

  export type IdResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type IsActivatedResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => boolean | Promise<boolean>

  export type EmailResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type NameResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type LoginResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | null | Promise<string | null>

  export type VideosAddedResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video[] | Promise<Video[]>

  export type VideosBookmarkedResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video[] | Promise<Video[]>

  export interface Type {
    id: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    isActivated: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => boolean | Promise<boolean>

    email: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    name: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    login: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | null | Promise<string | null>

    videosAdded: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video[] | Promise<Video[]>

    videosBookmarked: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video[] | Promise<Video[]>
  }
}

export namespace VideoResolvers {
  export const defaultResolvers = {
    id: (parent: Video) => parent.id,
    ytId: (parent: Video) => parent.ytId,
    complexity: (parent: Video) => parent.complexity,
  }

  export type IdResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type YtIdResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type ComplexityResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Complexity | Promise<Complexity>

  export type TopicsResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Topic[] | Promise<Topic[]>

  export type TagsResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Tag[] | Promise<Tag[]>

  export type AdderResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>

  export type BookmarkersResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>

  export type SnippetResolver = (
    parent: Video,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | null | Promise<string | null>

  export interface Type {
    id: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    ytId: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    complexity: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Complexity | Promise<Complexity>

    topics: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Topic[] | Promise<Topic[]>

    tags: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Tag[] | Promise<Tag[]>

    adder: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>

    bookmarkers: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>

    snippet: (
      parent: Video,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | null | Promise<string | null>
  }
}

export namespace TopicResolvers {
  export const defaultResolvers = {
    id: (parent: Topic) => parent.id,
    value: (parent: Topic) => parent.value,
    text: (parent: Topic) => parent.text,
  }

  export type IdResolver = (
    parent: Topic,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type ValueResolver = (
    parent: Topic,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type TextResolver = (
    parent: Topic,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type ParentResolver = (
    parent: Topic,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video | null | Promise<Video | null>

  export interface Type {
    id: (
      parent: Topic,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    value: (
      parent: Topic,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    text: (
      parent: Topic,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    parent: (
      parent: Topic,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video | null | Promise<Video | null>
  }
}

export namespace TagResolvers {
  export const defaultResolvers = {
    id: (parent: Tag) => parent.id,
    value: (parent: Tag) => parent.value,
    text: (parent: Tag) => parent.text,
  }

  export type IdResolver = (
    parent: Tag,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type ValueResolver = (
    parent: Tag,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type TextResolver = (
    parent: Tag,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export type ParentResolver = (
    parent: Tag,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Video | null | Promise<Video | null>

  export interface Type {
    id: (
      parent: Tag,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    value: (
      parent: Tag,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    text: (
      parent: Tag,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>

    parent: (
      parent: Tag,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Video | null | Promise<Video | null>
  }
}

export namespace PayloadResolvers {
  export const defaultResolvers = {
    message: (parent: Payload) => parent.message,
  }

  export type MessageResolver = (
    parent: Payload,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>

  export interface Type {
    message: (
      parent: Payload,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>
  }
}

export interface Resolvers {
  Query: QueryResolvers.Type
  Mutation: MutationResolvers.Type
  User: UserResolvers.Type
  Video: VideoResolvers.Type
  Topic: TopicResolvers.Type
  Tag: TagResolvers.Type
  Payload: PayloadResolvers.Type
}
