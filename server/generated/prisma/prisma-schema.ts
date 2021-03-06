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

type AggregateLanguage {
  count: Int!
}

type AggregatePasswordResetCode {
  count: Int!
}

type AggregatePayload {
  count: Int!
}

type AggregateRating {
  count: Int!
}

type AggregateTag {
  count: Int!
}

type AggregateTopic {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type AggregateVote {
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

type Language {
  id: ID!
  value: String!
  text: String!
  parent(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

type LanguageConnection {
  pageInfo: PageInfo!
  edges: [LanguageEdge]!
  aggregate: AggregateLanguage!
}

input LanguageCreateInput {
  value: String!
  text: String!
  parent: VideoCreateManyWithoutLanguageInput
}

input LanguageCreateOneWithoutParentInput {
  create: LanguageCreateWithoutParentInput
  connect: LanguageWhereUniqueInput
}

input LanguageCreateWithoutParentInput {
  value: String!
  text: String!
}

type LanguageEdge {
  node: Language!
  cursor: String!
}

enum LanguageOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LanguagePreviousValues {
  id: ID!
  value: String!
  text: String!
}

type LanguageSubscriptionPayload {
  mutation: MutationType!
  node: Language
  updatedFields: [String!]
  previousValues: LanguagePreviousValues
}

input LanguageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LanguageWhereInput
  AND: [LanguageSubscriptionWhereInput!]
  OR: [LanguageSubscriptionWhereInput!]
  NOT: [LanguageSubscriptionWhereInput!]
}

input LanguageUpdateInput {
  value: String
  text: String
  parent: VideoUpdateManyWithoutLanguageInput
}

input LanguageUpdateManyMutationInput {
  value: String
  text: String
}

input LanguageUpdateOneRequiredWithoutParentInput {
  create: LanguageCreateWithoutParentInput
  update: LanguageUpdateWithoutParentDataInput
  upsert: LanguageUpsertWithoutParentInput
  connect: LanguageWhereUniqueInput
}

input LanguageUpdateWithoutParentDataInput {
  value: String
  text: String
}

input LanguageUpsertWithoutParentInput {
  update: LanguageUpdateWithoutParentDataInput!
  create: LanguageCreateWithoutParentInput!
}

input LanguageWhereInput {
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
  parent_every: VideoWhereInput
  parent_some: VideoWhereInput
  parent_none: VideoWhereInput
  AND: [LanguageWhereInput!]
  OR: [LanguageWhereInput!]
  NOT: [LanguageWhereInput!]
}

input LanguageWhereUniqueInput {
  id: ID
  value: String
  text: String
}

scalar Long

type Mutation {
  createAccountActivationCode(data: AccountActivationCodeCreateInput!): AccountActivationCode!
  updateAccountActivationCode(data: AccountActivationCodeUpdateInput!, where: AccountActivationCodeWhereUniqueInput!): AccountActivationCode
  upsertAccountActivationCode(where: AccountActivationCodeWhereUniqueInput!, create: AccountActivationCodeCreateInput!, update: AccountActivationCodeUpdateInput!): AccountActivationCode!
  deleteAccountActivationCode(where: AccountActivationCodeWhereUniqueInput!): AccountActivationCode
  deleteManyAccountActivationCodes(where: AccountActivationCodeWhereInput): BatchPayload!
  createLanguage(data: LanguageCreateInput!): Language!
  updateLanguage(data: LanguageUpdateInput!, where: LanguageWhereUniqueInput!): Language
  updateManyLanguages(data: LanguageUpdateManyMutationInput!, where: LanguageWhereInput): BatchPayload!
  upsertLanguage(where: LanguageWhereUniqueInput!, create: LanguageCreateInput!, update: LanguageUpdateInput!): Language!
  deleteLanguage(where: LanguageWhereUniqueInput!): Language
  deleteManyLanguages(where: LanguageWhereInput): BatchPayload!
  createPasswordResetCode(data: PasswordResetCodeCreateInput!): PasswordResetCode!
  updatePasswordResetCode(data: PasswordResetCodeUpdateInput!, where: PasswordResetCodeWhereUniqueInput!): PasswordResetCode
  upsertPasswordResetCode(where: PasswordResetCodeWhereUniqueInput!, create: PasswordResetCodeCreateInput!, update: PasswordResetCodeUpdateInput!): PasswordResetCode!
  deletePasswordResetCode(where: PasswordResetCodeWhereUniqueInput!): PasswordResetCode
  deleteManyPasswordResetCodes(where: PasswordResetCodeWhereInput): BatchPayload!
  createPayload(data: PayloadCreateInput!): Payload!
  updateManyPayloads(data: PayloadUpdateManyMutationInput!, where: PayloadWhereInput): BatchPayload!
  deleteManyPayloads(where: PayloadWhereInput): BatchPayload!
  createRating(data: RatingCreateInput!): Rating!
  updateManyRatings(data: RatingUpdateManyMutationInput!, where: RatingWhereInput): BatchPayload!
  deleteManyRatings(where: RatingWhereInput): BatchPayload!
  createTag(data: TagCreateInput!): Tag!
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateManyTags(data: TagUpdateManyMutationInput!, where: TagWhereInput): BatchPayload!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteManyTags(where: TagWhereInput): BatchPayload!
  createTopic(data: TopicCreateInput!): Topic!
  updateTopic(data: TopicUpdateInput!, where: TopicWhereUniqueInput!): Topic
  updateManyTopics(data: TopicUpdateManyMutationInput!, where: TopicWhereInput): BatchPayload!
  upsertTopic(where: TopicWhereUniqueInput!, create: TopicCreateInput!, update: TopicUpdateInput!): Topic!
  deleteTopic(where: TopicWhereUniqueInput!): Topic
  deleteManyTopics(where: TopicWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateManyMutationInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
  createVote(data: VoteCreateInput!): Vote!
  updateVote(data: VoteUpdateInput!, where: VoteWhereUniqueInput!): Vote
  updateManyVotes(data: VoteUpdateManyMutationInput!, where: VoteWhereInput): BatchPayload!
  upsertVote(where: VoteWhereUniqueInput!, create: VoteCreateInput!, update: VoteUpdateInput!): Vote!
  deleteVote(where: VoteWhereUniqueInput!): Vote
  deleteManyVotes(where: VoteWhereInput): BatchPayload!
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

type Payload {
  message: String!
}

type PayloadConnection {
  pageInfo: PageInfo!
  edges: [PayloadEdge]!
  aggregate: AggregatePayload!
}

input PayloadCreateInput {
  message: String!
}

type PayloadEdge {
  node: Payload!
  cursor: String!
}

enum PayloadOrderByInput {
  message_ASC
  message_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PayloadPreviousValues {
  message: String!
}

type PayloadSubscriptionPayload {
  mutation: MutationType!
  node: Payload
  updatedFields: [String!]
  previousValues: PayloadPreviousValues
}

input PayloadSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PayloadWhereInput
  AND: [PayloadSubscriptionWhereInput!]
  OR: [PayloadSubscriptionWhereInput!]
  NOT: [PayloadSubscriptionWhereInput!]
}

input PayloadUpdateManyMutationInput {
  message: String
}

input PayloadWhereInput {
  message: String
  message_not: String
  message_in: [String!]
  message_not_in: [String!]
  message_lt: String
  message_lte: String
  message_gt: String
  message_gte: String
  message_contains: String
  message_not_contains: String
  message_starts_with: String
  message_not_starts_with: String
  message_ends_with: String
  message_not_ends_with: String
  AND: [PayloadWhereInput!]
  OR: [PayloadWhereInput!]
  NOT: [PayloadWhereInput!]
}

type Query {
  accountActivationCode(where: AccountActivationCodeWhereUniqueInput!): AccountActivationCode
  accountActivationCodes(where: AccountActivationCodeWhereInput, orderBy: AccountActivationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccountActivationCode]!
  accountActivationCodesConnection(where: AccountActivationCodeWhereInput, orderBy: AccountActivationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccountActivationCodeConnection!
  language(where: LanguageWhereUniqueInput!): Language
  languages(where: LanguageWhereInput, orderBy: LanguageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Language]!
  languagesConnection(where: LanguageWhereInput, orderBy: LanguageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LanguageConnection!
  passwordResetCode(where: PasswordResetCodeWhereUniqueInput!): PasswordResetCode
  passwordResetCodes(where: PasswordResetCodeWhereInput, orderBy: PasswordResetCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PasswordResetCode]!
  passwordResetCodesConnection(where: PasswordResetCodeWhereInput, orderBy: PasswordResetCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PasswordResetCodeConnection!
  payloads(where: PayloadWhereInput, orderBy: PayloadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Payload]!
  payloadsConnection(where: PayloadWhereInput, orderBy: PayloadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PayloadConnection!
  ratings(where: RatingWhereInput, orderBy: RatingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Rating]!
  ratingsConnection(where: RatingWhereInput, orderBy: RatingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RatingConnection!
  tag(where: TagWhereUniqueInput!): Tag
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  topic(where: TopicWhereUniqueInput!): Topic
  topics(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Topic]!
  topicsConnection(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TopicConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  vote(where: VoteWhereUniqueInput!): Vote
  votes(where: VoteWhereInput, orderBy: VoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Vote]!
  votesConnection(where: VoteWhereInput, orderBy: VoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VoteConnection!
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

input RatingUpdateManyMutationInput {
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

enum Role {
  USER
  EDITOR
  ADMIN
}

type Subscription {
  accountActivationCode(where: AccountActivationCodeSubscriptionWhereInput): AccountActivationCodeSubscriptionPayload
  language(where: LanguageSubscriptionWhereInput): LanguageSubscriptionPayload
  passwordResetCode(where: PasswordResetCodeSubscriptionWhereInput): PasswordResetCodeSubscriptionPayload
  payload(where: PayloadSubscriptionWhereInput): PayloadSubscriptionPayload
  rating(where: RatingSubscriptionWhereInput): RatingSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  topic(where: TopicSubscriptionWhereInput): TopicSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
  vote(where: VoteSubscriptionWhereInput): VoteSubscriptionPayload
}

type Tag {
  id: ID!
  value: String!
  text: String!
  parent(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

type TagConnection {
  pageInfo: PageInfo!
  edges: [TagEdge]!
  aggregate: AggregateTag!
}

input TagCreateInput {
  value: String!
  text: String!
  parent: VideoCreateManyWithoutTagsInput
}

input TagCreateManyWithoutParentInput {
  create: [TagCreateWithoutParentInput!]
  connect: [TagWhereUniqueInput!]
}

input TagCreateWithoutParentInput {
  value: String!
  text: String!
}

type TagEdge {
  node: Tag!
  cursor: String!
}

enum TagOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TagPreviousValues {
  id: ID!
  value: String!
  text: String!
}

input TagScalarWhereInput {
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
  AND: [TagScalarWhereInput!]
  OR: [TagScalarWhereInput!]
  NOT: [TagScalarWhereInput!]
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

input TagUpdateInput {
  value: String
  text: String
  parent: VideoUpdateManyWithoutTagsInput
}

input TagUpdateManyDataInput {
  value: String
  text: String
}

input TagUpdateManyMutationInput {
  value: String
  text: String
}

input TagUpdateManyWithoutParentInput {
  create: [TagCreateWithoutParentInput!]
  delete: [TagWhereUniqueInput!]
  connect: [TagWhereUniqueInput!]
  disconnect: [TagWhereUniqueInput!]
  update: [TagUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [TagUpsertWithWhereUniqueWithoutParentInput!]
  deleteMany: [TagScalarWhereInput!]
  updateMany: [TagUpdateManyWithWhereNestedInput!]
}

input TagUpdateManyWithWhereNestedInput {
  where: TagScalarWhereInput!
  data: TagUpdateManyDataInput!
}

input TagUpdateWithoutParentDataInput {
  value: String
  text: String
}

input TagUpdateWithWhereUniqueWithoutParentInput {
  where: TagWhereUniqueInput!
  data: TagUpdateWithoutParentDataInput!
}

input TagUpsertWithWhereUniqueWithoutParentInput {
  where: TagWhereUniqueInput!
  update: TagUpdateWithoutParentDataInput!
  create: TagCreateWithoutParentInput!
}

input TagWhereInput {
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
  parent_every: VideoWhereInput
  parent_some: VideoWhereInput
  parent_none: VideoWhereInput
  AND: [TagWhereInput!]
  OR: [TagWhereInput!]
  NOT: [TagWhereInput!]
}

input TagWhereUniqueInput {
  id: ID
  value: String
  text: String
}

type Topic {
  id: ID!
  value: String!
  text: String!
  parent(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

type TopicConnection {
  pageInfo: PageInfo!
  edges: [TopicEdge]!
  aggregate: AggregateTopic!
}

input TopicCreateInput {
  value: String!
  text: String!
  parent: VideoCreateManyWithoutTopicsInput
}

input TopicCreateManyWithoutParentInput {
  create: [TopicCreateWithoutParentInput!]
  connect: [TopicWhereUniqueInput!]
}

input TopicCreateWithoutParentInput {
  value: String!
  text: String!
}

type TopicEdge {
  node: Topic!
  cursor: String!
}

enum TopicOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TopicPreviousValues {
  id: ID!
  value: String!
  text: String!
}

input TopicScalarWhereInput {
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
  AND: [TopicScalarWhereInput!]
  OR: [TopicScalarWhereInput!]
  NOT: [TopicScalarWhereInput!]
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

input TopicUpdateInput {
  value: String
  text: String
  parent: VideoUpdateManyWithoutTopicsInput
}

input TopicUpdateManyDataInput {
  value: String
  text: String
}

input TopicUpdateManyMutationInput {
  value: String
  text: String
}

input TopicUpdateManyWithoutParentInput {
  create: [TopicCreateWithoutParentInput!]
  delete: [TopicWhereUniqueInput!]
  connect: [TopicWhereUniqueInput!]
  disconnect: [TopicWhereUniqueInput!]
  update: [TopicUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [TopicUpsertWithWhereUniqueWithoutParentInput!]
  deleteMany: [TopicScalarWhereInput!]
  updateMany: [TopicUpdateManyWithWhereNestedInput!]
}

input TopicUpdateManyWithWhereNestedInput {
  where: TopicScalarWhereInput!
  data: TopicUpdateManyDataInput!
}

input TopicUpdateWithoutParentDataInput {
  value: String
  text: String
}

input TopicUpdateWithWhereUniqueWithoutParentInput {
  where: TopicWhereUniqueInput!
  data: TopicUpdateWithoutParentDataInput!
}

input TopicUpsertWithWhereUniqueWithoutParentInput {
  where: TopicWhereUniqueInput!
  update: TopicUpdateWithoutParentDataInput!
  create: TopicCreateWithoutParentInput!
}

input TopicWhereInput {
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
  parent_every: VideoWhereInput
  parent_some: VideoWhereInput
  parent_none: VideoWhereInput
  AND: [TopicWhereInput!]
  OR: [TopicWhereInput!]
  NOT: [TopicWhereInput!]
}

input TopicWhereUniqueInput {
  id: ID
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
  role: Role!
  rank: Int!
  videosAdded(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  videosBookmarked(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  votes(where: VoteWhereInput, orderBy: VoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Vote!]
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
  role: Role
  rank: Int
  videosAdded: VideoCreateManyWithoutAdderInput
  videosBookmarked: VideoCreateManyWithoutBookmarkersInput
  votes: VoteCreateManyWithoutUserInput
}

input UserCreateManyWithoutVideosBookmarkedInput {
  create: [UserCreateWithoutVideosBookmarkedInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutActivationCodeInput {
  create: UserCreateWithoutActivationCodeInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPasswordResetCodeInput {
  create: UserCreateWithoutPasswordResetCodeInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutVideosAddedInput {
  create: UserCreateWithoutVideosAddedInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutVotesInput {
  create: UserCreateWithoutVotesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutActivationCodeInput {
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  role: Role
  rank: Int
  videosAdded: VideoCreateManyWithoutAdderInput
  videosBookmarked: VideoCreateManyWithoutBookmarkersInput
  votes: VoteCreateManyWithoutUserInput
}

input UserCreateWithoutPasswordResetCodeInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  role: Role
  rank: Int
  videosAdded: VideoCreateManyWithoutAdderInput
  videosBookmarked: VideoCreateManyWithoutBookmarkersInput
  votes: VoteCreateManyWithoutUserInput
}

input UserCreateWithoutVideosAddedInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  role: Role
  rank: Int
  videosBookmarked: VideoCreateManyWithoutBookmarkersInput
  votes: VoteCreateManyWithoutUserInput
}

input UserCreateWithoutVideosBookmarkedInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  role: Role
  rank: Int
  videosAdded: VideoCreateManyWithoutAdderInput
  votes: VoteCreateManyWithoutUserInput
}

input UserCreateWithoutVotesInput {
  activationCode: AccountActivationCodeCreateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeCreateOneWithoutUserInput
  isActivated: Boolean
  login: String!
  email: String!
  password: String!
  name: String!
  role: Role
  rank: Int
  videosAdded: VideoCreateManyWithoutAdderInput
  videosBookmarked: VideoCreateManyWithoutBookmarkersInput
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
  role_ASC
  role_DESC
  rank_ASC
  rank_DESC
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
  role: Role!
  rank: Int!
}

input UserScalarWhereInput {
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
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  rank: Int
  rank_not: Int
  rank_in: [Int!]
  rank_not_in: [Int!]
  rank_lt: Int
  rank_lte: Int
  rank_gt: Int
  rank_gte: Int
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
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
  role: Role
  rank: Int
  videosAdded: VideoUpdateManyWithoutAdderInput
  videosBookmarked: VideoUpdateManyWithoutBookmarkersInput
  votes: VoteUpdateManyWithoutUserInput
}

input UserUpdateManyDataInput {
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  role: Role
  rank: Int
}

input UserUpdateManyMutationInput {
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  role: Role
  rank: Int
}

input UserUpdateManyWithoutVideosBookmarkedInput {
  create: [UserCreateWithoutVideosBookmarkedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutVideosBookmarkedInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutVideosBookmarkedInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredWithoutVideosAddedInput {
  create: UserCreateWithoutVideosAddedInput
  update: UserUpdateWithoutVideosAddedDataInput
  upsert: UserUpsertWithoutVideosAddedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutVotesInput {
  create: UserCreateWithoutVotesInput
  update: UserUpdateWithoutVotesDataInput
  upsert: UserUpsertWithoutVotesInput
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
  role: Role
  rank: Int
  videosAdded: VideoUpdateManyWithoutAdderInput
  videosBookmarked: VideoUpdateManyWithoutBookmarkersInput
  votes: VoteUpdateManyWithoutUserInput
}

input UserUpdateWithoutPasswordResetCodeDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  role: Role
  rank: Int
  videosAdded: VideoUpdateManyWithoutAdderInput
  videosBookmarked: VideoUpdateManyWithoutBookmarkersInput
  votes: VoteUpdateManyWithoutUserInput
}

input UserUpdateWithoutVideosAddedDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  role: Role
  rank: Int
  videosBookmarked: VideoUpdateManyWithoutBookmarkersInput
  votes: VoteUpdateManyWithoutUserInput
}

input UserUpdateWithoutVideosBookmarkedDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  role: Role
  rank: Int
  videosAdded: VideoUpdateManyWithoutAdderInput
  votes: VoteUpdateManyWithoutUserInput
}

input UserUpdateWithoutVotesDataInput {
  activationCode: AccountActivationCodeUpdateOneWithoutUserInput
  passwordResetCode: PasswordResetCodeUpdateOneWithoutUserInput
  isActivated: Boolean
  login: String
  email: String
  password: String
  name: String
  role: Role
  rank: Int
  videosAdded: VideoUpdateManyWithoutAdderInput
  videosBookmarked: VideoUpdateManyWithoutBookmarkersInput
}

input UserUpdateWithWhereUniqueWithoutVideosBookmarkedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutVideosBookmarkedDataInput!
}

input UserUpsertWithoutActivationCodeInput {
  update: UserUpdateWithoutActivationCodeDataInput!
  create: UserCreateWithoutActivationCodeInput!
}

input UserUpsertWithoutPasswordResetCodeInput {
  update: UserUpdateWithoutPasswordResetCodeDataInput!
  create: UserCreateWithoutPasswordResetCodeInput!
}

input UserUpsertWithoutVideosAddedInput {
  update: UserUpdateWithoutVideosAddedDataInput!
  create: UserCreateWithoutVideosAddedInput!
}

input UserUpsertWithoutVotesInput {
  update: UserUpdateWithoutVotesDataInput!
  create: UserCreateWithoutVotesInput!
}

input UserUpsertWithWhereUniqueWithoutVideosBookmarkedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutVideosBookmarkedDataInput!
  create: UserCreateWithoutVideosBookmarkedInput!
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
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  rank: Int
  rank_not: Int
  rank_in: [Int!]
  rank_not_in: [Int!]
  rank_lt: Int
  rank_lte: Int
  rank_gt: Int
  rank_gte: Int
  videosAdded_every: VideoWhereInput
  videosAdded_some: VideoWhereInput
  videosAdded_none: VideoWhereInput
  videosBookmarked_every: VideoWhereInput
  videosBookmarked_some: VideoWhereInput
  videosBookmarked_none: VideoWhereInput
  votes_every: VoteWhereInput
  votes_some: VoteWhereInput
  votes_none: VoteWhereInput
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
  id: ID!
  ytId: String!
  complexity: Complexity!
  language: Language!
  topics(where: TopicWhereInput, orderBy: TopicOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Topic!]
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
  adder: User!
  bookmarkers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  votes(where: VoteWhereInput, orderBy: VoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Vote!]
  voteScore: Int!
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  ytId: String!
  complexity: Complexity!
  language: LanguageCreateOneWithoutParentInput!
  topics: TopicCreateManyWithoutParentInput
  tags: TagCreateManyWithoutParentInput
  adder: UserCreateOneWithoutVideosAddedInput!
  bookmarkers: UserCreateManyWithoutVideosBookmarkedInput
  votes: VoteCreateManyWithoutParentInput
  voteScore: Int
}

input VideoCreateManyWithoutAdderInput {
  create: [VideoCreateWithoutAdderInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateManyWithoutBookmarkersInput {
  create: [VideoCreateWithoutBookmarkersInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateManyWithoutLanguageInput {
  create: [VideoCreateWithoutLanguageInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateManyWithoutTagsInput {
  create: [VideoCreateWithoutTagsInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateManyWithoutTopicsInput {
  create: [VideoCreateWithoutTopicsInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateOneWithoutVotesInput {
  create: VideoCreateWithoutVotesInput
  connect: VideoWhereUniqueInput
}

input VideoCreateWithoutAdderInput {
  ytId: String!
  complexity: Complexity!
  language: LanguageCreateOneWithoutParentInput!
  topics: TopicCreateManyWithoutParentInput
  tags: TagCreateManyWithoutParentInput
  bookmarkers: UserCreateManyWithoutVideosBookmarkedInput
  votes: VoteCreateManyWithoutParentInput
  voteScore: Int
}

input VideoCreateWithoutBookmarkersInput {
  ytId: String!
  complexity: Complexity!
  language: LanguageCreateOneWithoutParentInput!
  topics: TopicCreateManyWithoutParentInput
  tags: TagCreateManyWithoutParentInput
  adder: UserCreateOneWithoutVideosAddedInput!
  votes: VoteCreateManyWithoutParentInput
  voteScore: Int
}

input VideoCreateWithoutLanguageInput {
  ytId: String!
  complexity: Complexity!
  topics: TopicCreateManyWithoutParentInput
  tags: TagCreateManyWithoutParentInput
  adder: UserCreateOneWithoutVideosAddedInput!
  bookmarkers: UserCreateManyWithoutVideosBookmarkedInput
  votes: VoteCreateManyWithoutParentInput
  voteScore: Int
}

input VideoCreateWithoutTagsInput {
  ytId: String!
  complexity: Complexity!
  language: LanguageCreateOneWithoutParentInput!
  topics: TopicCreateManyWithoutParentInput
  adder: UserCreateOneWithoutVideosAddedInput!
  bookmarkers: UserCreateManyWithoutVideosBookmarkedInput
  votes: VoteCreateManyWithoutParentInput
  voteScore: Int
}

input VideoCreateWithoutTopicsInput {
  ytId: String!
  complexity: Complexity!
  language: LanguageCreateOneWithoutParentInput!
  tags: TagCreateManyWithoutParentInput
  adder: UserCreateOneWithoutVideosAddedInput!
  bookmarkers: UserCreateManyWithoutVideosBookmarkedInput
  votes: VoteCreateManyWithoutParentInput
  voteScore: Int
}

input VideoCreateWithoutVotesInput {
  ytId: String!
  complexity: Complexity!
  language: LanguageCreateOneWithoutParentInput!
  topics: TopicCreateManyWithoutParentInput
  tags: TagCreateManyWithoutParentInput
  adder: UserCreateOneWithoutVideosAddedInput!
  bookmarkers: UserCreateManyWithoutVideosBookmarkedInput
  voteScore: Int
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  ytId_ASC
  ytId_DESC
  complexity_ASC
  complexity_DESC
  voteScore_ASC
  voteScore_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoPreviousValues {
  id: ID!
  ytId: String!
  complexity: Complexity!
  voteScore: Int!
}

input VideoScalarWhereInput {
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
  voteScore: Int
  voteScore_not: Int
  voteScore_in: [Int!]
  voteScore_not_in: [Int!]
  voteScore_lt: Int
  voteScore_lte: Int
  voteScore_gt: Int
  voteScore_gte: Int
  AND: [VideoScalarWhereInput!]
  OR: [VideoScalarWhereInput!]
  NOT: [VideoScalarWhereInput!]
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
  language: LanguageUpdateOneRequiredWithoutParentInput
  topics: TopicUpdateManyWithoutParentInput
  tags: TagUpdateManyWithoutParentInput
  adder: UserUpdateOneRequiredWithoutVideosAddedInput
  bookmarkers: UserUpdateManyWithoutVideosBookmarkedInput
  votes: VoteUpdateManyWithoutParentInput
  voteScore: Int
}

input VideoUpdateManyDataInput {
  ytId: String
  complexity: Complexity
  voteScore: Int
}

input VideoUpdateManyMutationInput {
  ytId: String
  complexity: Complexity
  voteScore: Int
}

input VideoUpdateManyWithoutAdderInput {
  create: [VideoCreateWithoutAdderInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutAdderInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutAdderInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithoutBookmarkersInput {
  create: [VideoCreateWithoutBookmarkersInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutBookmarkersInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutBookmarkersInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithoutLanguageInput {
  create: [VideoCreateWithoutLanguageInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutLanguageInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutLanguageInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithoutTagsInput {
  create: [VideoCreateWithoutTagsInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutTagsInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutTagsInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithoutTopicsInput {
  create: [VideoCreateWithoutTopicsInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutTopicsInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutTopicsInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithWhereNestedInput {
  where: VideoScalarWhereInput!
  data: VideoUpdateManyDataInput!
}

input VideoUpdateOneRequiredWithoutVotesInput {
  create: VideoCreateWithoutVotesInput
  update: VideoUpdateWithoutVotesDataInput
  upsert: VideoUpsertWithoutVotesInput
  connect: VideoWhereUniqueInput
}

input VideoUpdateWithoutAdderDataInput {
  ytId: String
  complexity: Complexity
  language: LanguageUpdateOneRequiredWithoutParentInput
  topics: TopicUpdateManyWithoutParentInput
  tags: TagUpdateManyWithoutParentInput
  bookmarkers: UserUpdateManyWithoutVideosBookmarkedInput
  votes: VoteUpdateManyWithoutParentInput
  voteScore: Int
}

input VideoUpdateWithoutBookmarkersDataInput {
  ytId: String
  complexity: Complexity
  language: LanguageUpdateOneRequiredWithoutParentInput
  topics: TopicUpdateManyWithoutParentInput
  tags: TagUpdateManyWithoutParentInput
  adder: UserUpdateOneRequiredWithoutVideosAddedInput
  votes: VoteUpdateManyWithoutParentInput
  voteScore: Int
}

input VideoUpdateWithoutLanguageDataInput {
  ytId: String
  complexity: Complexity
  topics: TopicUpdateManyWithoutParentInput
  tags: TagUpdateManyWithoutParentInput
  adder: UserUpdateOneRequiredWithoutVideosAddedInput
  bookmarkers: UserUpdateManyWithoutVideosBookmarkedInput
  votes: VoteUpdateManyWithoutParentInput
  voteScore: Int
}

input VideoUpdateWithoutTagsDataInput {
  ytId: String
  complexity: Complexity
  language: LanguageUpdateOneRequiredWithoutParentInput
  topics: TopicUpdateManyWithoutParentInput
  adder: UserUpdateOneRequiredWithoutVideosAddedInput
  bookmarkers: UserUpdateManyWithoutVideosBookmarkedInput
  votes: VoteUpdateManyWithoutParentInput
  voteScore: Int
}

input VideoUpdateWithoutTopicsDataInput {
  ytId: String
  complexity: Complexity
  language: LanguageUpdateOneRequiredWithoutParentInput
  tags: TagUpdateManyWithoutParentInput
  adder: UserUpdateOneRequiredWithoutVideosAddedInput
  bookmarkers: UserUpdateManyWithoutVideosBookmarkedInput
  votes: VoteUpdateManyWithoutParentInput
  voteScore: Int
}

input VideoUpdateWithoutVotesDataInput {
  ytId: String
  complexity: Complexity
  language: LanguageUpdateOneRequiredWithoutParentInput
  topics: TopicUpdateManyWithoutParentInput
  tags: TagUpdateManyWithoutParentInput
  adder: UserUpdateOneRequiredWithoutVideosAddedInput
  bookmarkers: UserUpdateManyWithoutVideosBookmarkedInput
  voteScore: Int
}

input VideoUpdateWithWhereUniqueWithoutAdderInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutAdderDataInput!
}

input VideoUpdateWithWhereUniqueWithoutBookmarkersInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutBookmarkersDataInput!
}

input VideoUpdateWithWhereUniqueWithoutLanguageInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutLanguageDataInput!
}

input VideoUpdateWithWhereUniqueWithoutTagsInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutTagsDataInput!
}

input VideoUpdateWithWhereUniqueWithoutTopicsInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutTopicsDataInput!
}

input VideoUpsertWithoutVotesInput {
  update: VideoUpdateWithoutVotesDataInput!
  create: VideoCreateWithoutVotesInput!
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

input VideoUpsertWithWhereUniqueWithoutLanguageInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutLanguageDataInput!
  create: VideoCreateWithoutLanguageInput!
}

input VideoUpsertWithWhereUniqueWithoutTagsInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutTagsDataInput!
  create: VideoCreateWithoutTagsInput!
}

input VideoUpsertWithWhereUniqueWithoutTopicsInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutTopicsDataInput!
  create: VideoCreateWithoutTopicsInput!
}

input VideoWhereInput {
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
  language: LanguageWhereInput
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
  votes_every: VoteWhereInput
  votes_some: VoteWhereInput
  votes_none: VoteWhereInput
  voteScore: Int
  voteScore_not: Int
  voteScore_in: [Int!]
  voteScore_not_in: [Int!]
  voteScore_lt: Int
  voteScore_lte: Int
  voteScore_gt: Int
  voteScore_gte: Int
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
  ytId: String
}

type Vote {
  id: ID!
  parent: Video!
  user: User!
  type: VoteType!
}

type VoteConnection {
  pageInfo: PageInfo!
  edges: [VoteEdge]!
  aggregate: AggregateVote!
}

input VoteCreateInput {
  parent: VideoCreateOneWithoutVotesInput!
  user: UserCreateOneWithoutVotesInput!
  type: VoteType!
}

input VoteCreateManyWithoutParentInput {
  create: [VoteCreateWithoutParentInput!]
  connect: [VoteWhereUniqueInput!]
}

input VoteCreateManyWithoutUserInput {
  create: [VoteCreateWithoutUserInput!]
  connect: [VoteWhereUniqueInput!]
}

input VoteCreateWithoutParentInput {
  user: UserCreateOneWithoutVotesInput!
  type: VoteType!
}

input VoteCreateWithoutUserInput {
  parent: VideoCreateOneWithoutVotesInput!
  type: VoteType!
}

type VoteEdge {
  node: Vote!
  cursor: String!
}

enum VoteOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VotePreviousValues {
  id: ID!
  type: VoteType!
}

input VoteScalarWhereInput {
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
  type: VoteType
  type_not: VoteType
  type_in: [VoteType!]
  type_not_in: [VoteType!]
  AND: [VoteScalarWhereInput!]
  OR: [VoteScalarWhereInput!]
  NOT: [VoteScalarWhereInput!]
}

type VoteSubscriptionPayload {
  mutation: MutationType!
  node: Vote
  updatedFields: [String!]
  previousValues: VotePreviousValues
}

input VoteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VoteWhereInput
  AND: [VoteSubscriptionWhereInput!]
  OR: [VoteSubscriptionWhereInput!]
  NOT: [VoteSubscriptionWhereInput!]
}

enum VoteType {
  UP
  DOWN
}

input VoteUpdateInput {
  parent: VideoUpdateOneRequiredWithoutVotesInput
  user: UserUpdateOneRequiredWithoutVotesInput
  type: VoteType
}

input VoteUpdateManyDataInput {
  type: VoteType
}

input VoteUpdateManyMutationInput {
  type: VoteType
}

input VoteUpdateManyWithoutParentInput {
  create: [VoteCreateWithoutParentInput!]
  delete: [VoteWhereUniqueInput!]
  connect: [VoteWhereUniqueInput!]
  disconnect: [VoteWhereUniqueInput!]
  update: [VoteUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [VoteUpsertWithWhereUniqueWithoutParentInput!]
  deleteMany: [VoteScalarWhereInput!]
  updateMany: [VoteUpdateManyWithWhereNestedInput!]
}

input VoteUpdateManyWithoutUserInput {
  create: [VoteCreateWithoutUserInput!]
  delete: [VoteWhereUniqueInput!]
  connect: [VoteWhereUniqueInput!]
  disconnect: [VoteWhereUniqueInput!]
  update: [VoteUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [VoteUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [VoteScalarWhereInput!]
  updateMany: [VoteUpdateManyWithWhereNestedInput!]
}

input VoteUpdateManyWithWhereNestedInput {
  where: VoteScalarWhereInput!
  data: VoteUpdateManyDataInput!
}

input VoteUpdateWithoutParentDataInput {
  user: UserUpdateOneRequiredWithoutVotesInput
  type: VoteType
}

input VoteUpdateWithoutUserDataInput {
  parent: VideoUpdateOneRequiredWithoutVotesInput
  type: VoteType
}

input VoteUpdateWithWhereUniqueWithoutParentInput {
  where: VoteWhereUniqueInput!
  data: VoteUpdateWithoutParentDataInput!
}

input VoteUpdateWithWhereUniqueWithoutUserInput {
  where: VoteWhereUniqueInput!
  data: VoteUpdateWithoutUserDataInput!
}

input VoteUpsertWithWhereUniqueWithoutParentInput {
  where: VoteWhereUniqueInput!
  update: VoteUpdateWithoutParentDataInput!
  create: VoteCreateWithoutParentInput!
}

input VoteUpsertWithWhereUniqueWithoutUserInput {
  where: VoteWhereUniqueInput!
  update: VoteUpdateWithoutUserDataInput!
  create: VoteCreateWithoutUserInput!
}

input VoteWhereInput {
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
  parent: VideoWhereInput
  user: UserWhereInput
  type: VoteType
  type_not: VoteType
  type_in: [VoteType!]
  type_not_in: [VoteType!]
  AND: [VoteWhereInput!]
  OR: [VoteWhereInput!]
  NOT: [VoteWhereInput!]
}

input VoteWhereUniqueInput {
  id: ID
}
`