export const typeDefs = /* GraphQL */ `type AccountActivationCode {
  id: ID!
  user: User
}

type AccountActivationCodeConnection {
  pageInfo: PageInfo!
  edges: [AccountActivationCodeEdge]!
  aggregate: AggregateAccountActivationCode!
}

input AccountActivationCodeCreateInput {
  user: UserCreateOneWithoutActivationCodeInput
}

input AccountActivationCodeCreateOneWithoutUserInput {
  connect: AccountActivationCodeWhereUniqueInput
}

type AccountActivationCodeEdge {
  node: AccountActivationCode!
  cursor: String!
}

enum AccountActivationCodeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccountActivationCodePreviousValues {
  id: ID!
}

type AccountActivationCodeSubscriptionPayload {
  mutation: MutationType!
  node: AccountActivationCode
  updatedFields: [String!]
  previousValues: AccountActivationCodePreviousValues
}

input AccountActivationCodeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AccountActivationCodeWhereInput
  AND: [AccountActivationCodeSubscriptionWhereInput!]
  OR: [AccountActivationCodeSubscriptionWhereInput!]
  NOT: [AccountActivationCodeSubscriptionWhereInput!]
}

input AccountActivationCodeUpdateInput {
  user: UserUpdateOneWithoutActivationCodeInput
}

input AccountActivationCodeUpdateOneWithoutUserInput {
  delete: Boolean
  disconnect: Boolean
  connect: AccountActivationCodeWhereUniqueInput
}

input AccountActivationCodeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  AND: [AccountActivationCodeWhereInput!]
  OR: [AccountActivationCodeWhereInput!]
  NOT: [AccountActivationCodeWhereInput!]
}

input AccountActivationCodeWhereUniqueInput {
  id: ID
}

type AggregateAccountActivationCode {
  count: Int!
}

type AggregatePasswordResetCode {
  count: Int!
}

type AggregateRating {
  count: Int!
}

type AggregateTag {
  count: Int!
}

type AggregateTags {
  count: Int!
}

type AggregateTopic {
  count: Int!
}

type AggregateTopics {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum Complexity {
  ELEMENTARY
  BASIC
  ADVANCED
  EXPERT
}

scalar Long

type Mutation {
  createAccountActivationCode(data: AccountActivationCodeCreateInput!): AccountActivationCode!
  updateAccountActivationCode(data: AccountActivationCodeUpdateInput!, where: AccountActivationCodeWhereUniqueInput!): AccountActivationCode
  updateManyAccountActivationCodes(data: AccountActivationCodeUpdateInput!, where: AccountActivationCodeWhereInput): BatchPayload!
  upsertAccountActivationCode(where: AccountActivationCodeWhereUniqueInput!, create: AccountActivationCodeCreateInput!, update: AccountActivationCodeUpdateInput!): AccountActivationCode!
  deleteAccountActivationCode(where: AccountActivationCodeWhereUniqueInput!): AccountActivationCode
  deleteManyAccountActivationCodes(where: AccountActivationCodeWhereInput): BatchPayload!
  createPasswordResetCode(data: PasswordResetCodeCreateInput!): PasswordResetCode!
  updatePasswordResetCode(data: PasswordResetCodeUpdateInput!, where: PasswordResetCodeWhereUniqueInput!): PasswordResetCode
  updateManyPasswordResetCodes(data: PasswordResetCodeUpdateInput!, where: PasswordResetCodeWhereInput): BatchPayload!
  upsertPasswordResetCode(where: PasswordResetCodeWhereUniqueInput!, create: PasswordResetCodeCreateInput!, update: PasswordResetCodeUpdateInput!): PasswordResetCode!
  deletePasswordResetCode(where: PasswordResetCodeWhereUniqueInput!): PasswordResetCode
  deleteManyPasswordResetCodes(where: PasswordResetCodeWhereInput): BatchPayload!
  createRating(data: RatingCreateInput!): Rating!
  updateManyRatings(data: RatingUpdateInput!, where: RatingWhereInput): BatchPayload!
  deleteManyRatings(where: RatingWhereInput): BatchPayload!
  createTag(data: TagCreateInput!): Tag!
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteManyTags(where: TagWhereInput): BatchPayload!
  createTags(data: TagsCreateInput!): Tags!
  updateManyTagses(data: TagsUpdateInput!, where: TagsWhereInput): BatchPayload!
  deleteManyTagses(where: TagsWhereInput): BatchPayload!
  createTopic(data: TopicCreateInput!): Topic!
  updateTopic(data: TopicUpdateInput!, where: TopicWhereUniqueInput!): Topic
  updateManyTopics(data: TopicUpdateInput!, where: TopicWhereInput): BatchPayload!
  upsertTopic(where: TopicWhereUniqueInput!, create: TopicCreateInput!, update: TopicUpdateInput!): Topic!
  deleteTopic(where: TopicWhereUniqueInput!): Topic
  deleteManyTopics(where: TopicWhereInput): BatchPayload!
  createTopics(data: TopicsCreateInput!): Topics!
  updateManyTopicses(data: TopicsUpdateInput!, where: TopicsWhereInput): BatchPayload!
  deleteManyTopicses(where: TopicsWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type PasswordResetCode {
  id: ID!
  user: User
}

type PasswordResetCodeConnection {
  pageInfo: PageInfo!
  edges: [PasswordResetCodeEdge]!
  aggregate: AggregatePasswordResetCode!
}

input PasswordResetCodeCreateInput {
  user: UserCreateOneWithoutPasswordResetCodeInput
}

input PasswordResetCodeCreateOneWithoutUserInput {
  connect: PasswordResetCodeWhereUniqueInput
}

type PasswordResetCodeEdge {
  node: PasswordResetCode!
  cursor: String!
}

enum PasswordResetCodeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PasswordResetCodePreviousValues {
  id: ID!
}

type PasswordResetCodeSubscriptionPayload {
  mutation: MutationType!
  node: PasswordResetCode
  updatedFields: [String!]
  previousValues: PasswordResetCodePreviousValues
}

input PasswordResetCodeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PasswordResetCodeWhereInput
  AND: [PasswordResetCodeSubscriptionWhereInput!]
  OR: [PasswordResetCodeSubscriptionWhereInput!]
  NOT: [PasswordResetCodeSubscriptionWhereInput!]
}

input PasswordResetCodeUpdateInput {
  user: UserUpdateOneWithoutPasswordResetCodeInput
}

input PasswordResetCodeUpdateOneWithoutUserInput {
  delete: Boolean
  disconnect: Boolean
  connect: PasswordResetCodeWhereUniqueInput
}

input PasswordResetCodeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  AND: [PasswordResetCodeWhereInput!]
  OR: [PasswordResetCodeWhereInput!]
  NOT: [PasswordResetCodeWhereInput!]
}

input PasswordResetCodeWhereUniqueInput {
  id: ID
}

type Query {
  accountActivationCode(where: AccountActivationCodeWhereUniqueInput!): AccountActivationCode
  accountActivationCodes(where: AccountActivationCodeWhereInput, orderBy: AccountActivationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccountActivationCode]!
  accountActivationCodesConnection(where: AccountActivationCodeWhereInput, orderBy: AccountActivationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccountActivationCodeConnection!
  passwordResetCode(where: PasswordResetCodeWhereUniqueInput!): PasswordResetCode
  passwordResetCodes(where: PasswordResetCodeWhereInput, orderBy: PasswordResetCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PasswordResetCode]!
  passwordResetCodesConnection(where: PasswordResetCodeWhereInput, orderBy: PasswordResetCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PasswordResetCodeConnection!
  ratings(where: RatingWhereInput, orderBy: RatingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Rating]!
  ratingsConnection(where: RatingWhereInput, orderBy: RatingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RatingConnection!
  tag(where: TagWhereUniqueInput!): Tag
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  tagses(where: TagsWhereInput, orderBy: TagsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tags]!
  tagsesConnection(where: TagsWhereInput, orderBy: TagsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagsConnection!
  topic(where: TopicWhereUniqueInput!): Topic
  topics(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Topic]!
  topicsConnection(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TopicConnection!
  topicses(where: TopicsWhereInput, orderBy: TopicsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Topics]!
  topicsesConnection(where: TopicsWhereInput, orderBy: TopicsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TopicsConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

type Rating {
  votes: Int!
  total: Int!
}

type RatingConnection {
  pageInfo: PageInfo!
  edges: [RatingEdge]!
  aggregate: AggregateRating!
}

input RatingCreateInput {
  votes: Int!
  total: Int!
}

type RatingEdge {
  node: Rating!
  cursor: String!
}

enum RatingOrderByInput {
  votes_ASC
  votes_DESC
  total_ASC
  total_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RatingPreviousValues {
  votes: Int!
  total: Int!
}

type RatingSubscriptionPayload {
  mutation: MutationType!
  node: Rating
  updatedFields: [String!]
  previousValues: RatingPreviousValues
}

input RatingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RatingWhereInput
  AND: [RatingSubscriptionWhereInput!]
  OR: [RatingSubscriptionWhereInput!]
  NOT: [RatingSubscriptionWhereInput!]
}

input RatingUpdateInput {
  votes: Int
  total: Int
}

input RatingWhereInput {
  votes: Int
  votes_not: Int
  votes_in: [Int!]
  votes_not_in: [Int!]
  votes_lt: Int
  votes_lte: Int
  votes_gt: Int
  votes_gte: Int
  total: Int
  total_not: Int
  total_in: [Int!]
  total_not_in: [Int!]
  total_lt: Int
  total_lte: Int
  total_gt: Int
  total_gte: Int
  AND: [RatingWhereInput!]
  OR: [RatingWhereInput!]
  NOT: [RatingWhereInput!]
}

type Subscription {
  accountActivationCode(where: AccountActivationCodeSubscriptionWhereInput): AccountActivationCodeSubscriptionPayload
  passwordResetCode(where: PasswordResetCodeSubscriptionWhereInput): PasswordResetCodeSubscriptionPayload
  rating(where: RatingSubscriptionWhereInput): RatingSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  tags(where: TagsSubscriptionWhereInput): TagsSubscriptionPayload
  topic(where: TopicSubscriptionWhereInput): TopicSubscriptionPayload
  topics(where: TopicsSubscriptionWhereInput): TopicsSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
}

type Tag {
  value: String!
  text: String!
}

type TagConnection {
  pageInfo: PageInfo!
  edges: [TagEdge]!
  aggregate: AggregateTag!
}

input TagCreateInput {
  value: String!
  text: String!
}

input TagCreateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
}

type TagEdge {
  node: Tag!
  cursor: String!
}

enum TagOrderByInput {
  value_ASC
  value_DESC
  text_ASC
  text_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TagPreviousValues {
  value: String!
  text: String!
}

type Tags {
  exist(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
}

type TagsConnection {
  pageInfo: PageInfo!
  edges: [TagsEdge]!
  aggregate: AggregateTags!
}

input TagsCreateInput {
  exist: TagCreateManyInput
}

type TagsEdge {
  node: Tags!
  cursor: String!
}

enum TagsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TagsSubscriptionPayload {
  mutation: MutationType!
  node: Tags
  updatedFields: [String!]
}

input TagsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TagsWhereInput
  AND: [TagsSubscriptionWhereInput!]
  OR: [TagsSubscriptionWhereInput!]
  NOT: [TagsSubscriptionWhereInput!]
}

type TagSubscriptionPayload {
  mutation: MutationType!
  node: Tag
  updatedFields: [String!]
  previousValues: TagPreviousValues
}

input TagSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TagWhereInput
  AND: [TagSubscriptionWhereInput!]
  OR: [TagSubscriptionWhereInput!]
  NOT: [TagSubscriptionWhereInput!]
}

input TagsUpdateInput {
  exist: TagUpdateManyInput
}

input TagsWhereInput {
  exist_every: TagWhereInput
  exist_some: TagWhereInput
  exist_none: TagWhereInput
  AND: [TagsWhereInput!]
  OR: [TagsWhereInput!]
  NOT: [TagsWhereInput!]
}

input TagUpdateDataInput {
  value: String
  text: String
}

input TagUpdateInput {
  value: String
  text: String
}

input TagUpdateManyInput {
  create: [TagCreateInput!]
  delete: [TagWhereUniqueInput!]
  connect: [TagWhereUniqueInput!]
  disconnect: [TagWhereUniqueInput!]
  update: [TagUpdateWithWhereUniqueNestedInput!]
  upsert: [TagUpsertWithWhereUniqueNestedInput!]
}

input TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  data: TagUpdateDataInput!
}

input TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [TagWhereInput!]
  OR: [TagWhereInput!]
  NOT: [TagWhereInput!]
}

input TagWhereUniqueInput {
  value: String
  text: String
}

type Topic {
  value: String!
  text: String!
}

type TopicConnection {
  pageInfo: PageInfo!
  edges: [TopicEdge]!
  aggregate: AggregateTopic!
}

input TopicCreateInput {
  value: String!
  text: String!
}

input TopicCreateManyInput {
  create: [TopicCreateInput!]
  connect: [TopicWhereUniqueInput!]
}

type TopicEdge {
  node: Topic!
  cursor: String!
}

enum TopicOrderByInput {
  value_ASC
  value_DESC
  text_ASC
  text_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TopicPreviousValues {
  value: String!
  text: String!
}

type Topics {
  exist(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Topic!]
}

type TopicsConnection {
  pageInfo: PageInfo!
  edges: [TopicsEdge]!
  aggregate: AggregateTopics!
}

input TopicsCreateInput {
  exist: TopicCreateManyInput
}

type TopicsEdge {
  node: Topics!
  cursor: String!
}

enum TopicsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TopicsSubscriptionPayload {
  mutation: MutationType!
  node: Topics
  updatedFields: [String!]
}

input TopicsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TopicsWhereInput
  AND: [TopicsSubscriptionWhereInput!]
  OR: [TopicsSubscriptionWhereInput!]
  NOT: [TopicsSubscriptionWhereInput!]
}

type TopicSubscriptionPayload {
  mutation: MutationType!
  node: Topic
  updatedFields: [String!]
  previousValues: TopicPreviousValues
}

input TopicSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TopicWhereInput
  AND: [TopicSubscriptionWhereInput!]
  OR: [TopicSubscriptionWhereInput!]
  NOT: [TopicSubscriptionWhereInput!]
}

input TopicsUpdateInput {
  exist: TopicUpdateManyInput
}

input TopicsWhereInput {
  exist_every: TopicWhereInput
  exist_some: TopicWhereInput
  exist_none: TopicWhereInput
  AND: [TopicsWhereInput!]
  OR: [TopicsWhereInput!]
  NOT: [TopicsWhereInput!]
}

input TopicUpdateDataInput {
  value: String
  text: String
}

input TopicUpdateInput {
  value: String
  text: String
}

input TopicUpdateManyInput {
  create: [TopicCreateInput!]
  delete: [TopicWhereUniqueInput!]
  connect: [TopicWhereUniqueInput!]
  disconnect: [TopicWhereUniqueInput!]
  update: [TopicUpdateWithWhereUniqueNestedInput!]
  upsert: [TopicUpsertWithWhereUniqueNestedInput!]
}

input TopicUpdateWithWhereUniqueNestedInput {
  where: TopicWhereUniqueInput!
  data: TopicUpdateDataInput!
}

input TopicUpsertWithWhereUniqueNestedInput {
  where: TopicWhereUniqueInput!
  update: TopicUpdateDataInput!
  create: TopicCreateInput!
}

input TopicWhereInput {
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [TopicWhereInput!]
  OR: [TopicWhereInput!]
  NOT: [TopicWhereInput!]
}

input TopicWhereUniqueInput {
  value: String
  text: String
}

type User {
  id: ID!
  activationCode: AccountActivationCode
  passwordResetCode: PasswordResetCode
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  myVideos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  bookmarkedVideos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  myVideos: VideoCreateManyWithoutAdderInput
  bookmarkedVideos: VideoCreateManyWithoutBookmarkersInput
}

input UserCreateManyWithoutBookmarkedVideosInput {
  create: [UserCreateWithoutBookmarkedVideosInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutActivationCodeInput {
  create: UserCreateWithoutActivationCodeInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutMyVideosInput {
  create: UserCreateWithoutMyVideosInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPasswordResetCodeInput {
  create: UserCreateWithoutPasswordResetCodeInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutActivationCodeInput {
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  myVideos: VideoCreateManyWithoutAdderInput
  bookmarkedVideos: VideoCreateManyWithoutBookmarkersInput
}

input UserCreateWithoutBookmarkedVideosInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  myVideos: VideoCreateManyWithoutAdderInput
}

input UserCreateWithoutMyVideosInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  bookmarkedVideos: VideoCreateManyWithoutBookmarkersInput
}

input UserCreateWithoutPasswordResetCodeInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  myVideos: VideoCreateManyWithoutAdderInput
  bookmarkedVideos: VideoCreateManyWithoutBookmarkersInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  isActivated_ASC
  isActivated_DESC
  login_ASC
  login_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  myVideos: VideoUpdateManyWithoutAdderInput
  bookmarkedVideos: VideoUpdateManyWithoutBookmarkersInput
}

input UserUpdateManyWithoutBookmarkedVideosInput {
  create: [UserCreateWithoutBookmarkedVideosInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutBookmarkedVideosInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutBookmarkedVideosInput!]
}

input UserUpdateOneRequiredWithoutMyVideosInput {
  create: UserCreateWithoutMyVideosInput
  update: UserUpdateWithoutMyVideosDataInput
  upsert: UserUpsertWithoutMyVideosInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutActivationCodeInput {
  create: UserCreateWithoutActivationCodeInput
  update: UserUpdateWithoutActivationCodeDataInput
  upsert: UserUpsertWithoutActivationCodeInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutPasswordResetCodeInput {
  create: UserCreateWithoutPasswordResetCodeInput
  update: UserUpdateWithoutPasswordResetCodeDataInput
  upsert: UserUpsertWithoutPasswordResetCodeInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutActivationCodeDataInput {
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  myVideos: VideoUpdateManyWithoutAdderInput
  bookmarkedVideos: VideoUpdateManyWithoutBookmarkersInput
}

input UserUpdateWithoutBookmarkedVideosDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  myVideos: VideoUpdateManyWithoutAdderInput
}

input UserUpdateWithoutMyVideosDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  bookmarkedVideos: VideoUpdateManyWithoutBookmarkersInput
}

input UserUpdateWithoutPasswordResetCodeDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  myVideos: VideoUpdateManyWithoutAdderInput
  bookmarkedVideos: VideoUpdateManyWithoutBookmarkersInput
}

input UserUpdateWithWhereUniqueWithoutBookmarkedVideosInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutBookmarkedVideosDataInput!
}

input UserUpsertWithoutActivationCodeInput {
  update: UserUpdateWithoutActivationCodeDataInput!
  create: UserCreateWithoutActivationCodeInput!
}

input UserUpsertWithoutMyVideosInput {
  update: UserUpdateWithoutMyVideosDataInput!
  create: UserCreateWithoutMyVideosInput!
}

input UserUpsertWithoutPasswordResetCodeInput {
  update: UserUpdateWithoutPasswordResetCodeDataInput!
  create: UserCreateWithoutPasswordResetCodeInput!
}

input UserUpsertWithWhereUniqueWithoutBookmarkedVideosInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutBookmarkedVideosDataInput!
  create: UserCreateWithoutBookmarkedVideosInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  activationCode: AccountActivationCodeWhereInput
  passwordResetCode: PasswordResetCodeWhereInput
  isActivated: Boolean
  isActivated_not: Boolean
  login: String
  login_not: String
  login_in: [String!]
  login_not_in: [String!]
  login_lt: String
  login_lte: String
  login_gt: String
  login_gte: String
  login_contains: String
  login_not_contains: String
  login_starts_with: String
  login_not_starts_with: String
  login_ends_with: String
  login_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  myVideos_every: VideoWhereInput
  myVideos_some: VideoWhereInput
  myVideos_none: VideoWhereInput
  bookmarkedVideos_every: VideoWhereInput
  bookmarkedVideos_some: VideoWhereInput
  bookmarkedVideos_none: VideoWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  login: String
  email: String
}

type Video {
  ytId: String!
  complexity: Complexity!
  topics(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Topic!]
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
  adder: User!
  bookmarkers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  ytId: String!
  complexity: Complexity!
  topics: TopicCreateManyInput
  tags: TagCreateManyInput
  adder: UserCreateOneWithoutMyVideosInput!
  bookmarkers: UserCreateManyWithoutBookmarkedVideosInput
}

input VideoCreateManyWithoutAdderInput {
  create: [VideoCreateWithoutAdderInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateManyWithoutBookmarkersInput {
  create: [VideoCreateWithoutBookmarkersInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateWithoutAdderInput {
  ytId: String!
  complexity: Complexity!
  topics: TopicCreateManyInput
  tags: TagCreateManyInput
  bookmarkers: UserCreateManyWithoutBookmarkedVideosInput
}

input VideoCreateWithoutBookmarkersInput {
  ytId: String!
  complexity: Complexity!
  topics: TopicCreateManyInput
  tags: TagCreateManyInput
  adder: UserCreateOneWithoutMyVideosInput!
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  ytId_ASC
  ytId_DESC
  complexity_ASC
  complexity_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoPreviousValues {
  ytId: String!
  complexity: Complexity!
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
  AND: [VideoSubscriptionWhereInput!]
  OR: [VideoSubscriptionWhereInput!]
  NOT: [VideoSubscriptionWhereInput!]
}

input VideoUpdateInput {
  ytId: String
  complexity: Complexity
  topics: TopicUpdateManyInput
  tags: TagUpdateManyInput
  adder: UserUpdateOneRequiredWithoutMyVideosInput
  bookmarkers: UserUpdateManyWithoutBookmarkedVideosInput
}

input VideoUpdateManyWithoutAdderInput {
  create: [VideoCreateWithoutAdderInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutAdderInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutAdderInput!]
}

input VideoUpdateManyWithoutBookmarkersInput {
  create: [VideoCreateWithoutBookmarkersInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutBookmarkersInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutBookmarkersInput!]
}

input VideoUpdateWithoutAdderDataInput {
  ytId: String
  complexity: Complexity
  topics: TopicUpdateManyInput
  tags: TagUpdateManyInput
  bookmarkers: UserUpdateManyWithoutBookmarkedVideosInput
}

input VideoUpdateWithoutBookmarkersDataInput {
  ytId: String
  complexity: Complexity
  topics: TopicUpdateManyInput
  tags: TagUpdateManyInput
  adder: UserUpdateOneRequiredWithoutMyVideosInput
}

input VideoUpdateWithWhereUniqueWithoutAdderInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutAdderDataInput!
}

input VideoUpdateWithWhereUniqueWithoutBookmarkersInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutBookmarkersDataInput!
}

input VideoUpsertWithWhereUniqueWithoutAdderInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutAdderDataInput!
  create: VideoCreateWithoutAdderInput!
}

input VideoUpsertWithWhereUniqueWithoutBookmarkersInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutBookmarkersDataInput!
  create: VideoCreateWithoutBookmarkersInput!
}

input VideoWhereInput {
  ytId: String
  ytId_not: String
  ytId_in: [String!]
  ytId_not_in: [String!]
  ytId_lt: String
  ytId_lte: String
  ytId_gt: String
  ytId_gte: String
  ytId_contains: String
  ytId_not_contains: String
  ytId_starts_with: String
  ytId_not_starts_with: String
  ytId_ends_with: String
  ytId_not_ends_with: String
  complexity: Complexity
  complexity_not: Complexity
  complexity_in: [Complexity!]
  complexity_not_in: [Complexity!]
  topics_every: TopicWhereInput
  topics_some: TopicWhereInput
  topics_none: TopicWhereInput
  tags_every: TagWhereInput
  tags_some: TagWhereInput
  tags_none: TagWhereInput
  adder: UserWhereInput
  bookmarkers_every: UserWhereInput
  bookmarkers_some: UserWhereInput
  bookmarkers_none: UserWhereInput
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  ytId: String
}
`