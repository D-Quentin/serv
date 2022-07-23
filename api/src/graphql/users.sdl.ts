export const schema = gql`
  type User {
    id: String!
    username: String!
    hashedPassword: String!
    salt: String!
    cryptoPositions: [CryptoPosition]!
    apiKeyBinance: String
    secretKeyBinance: String
    apiKeyBinanceTest: String
    secretKeyBinanceTest: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
    apiKeyBinance: String
    secretKeyBinance: String
    apiKeyBinanceTest: String
    secretKeyBinanceTest: String
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
    apiKeyBinance: String
    secretKeyBinance: String
    apiKeyBinanceTest: String
    secretKeyBinanceTest: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
