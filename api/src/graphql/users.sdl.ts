export const schema = gql`
  type User {
    id: String!
    username: String!
    hashedPassword: String!
    salt: String!
    CryptoPositions: [CryptoPosition]!
    ApiKey: String
    SecretKey: String
    TestApiKey: String
    TestSecretKey: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
    ApiKey: String
    SecretKey: String
    TestApiKey: String
    TestSecretKey: String
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
    ApiKey: String
    SecretKey: String
    TestApiKey: String
    TestSecretKey: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
