export const schema = gql`
  type CryptoPosition {
    id: String!
    userId: String!
    user: User!
    status: String!
    symbol: String!
    algorithm: String!
    amount: Float!
    test: Boolean!
    createdAt: DateTime!
    logs: [Log]!
  }

  type Query {
    cryptoPositions: [CryptoPosition!]! @requireAuth
    cryptoPosition(id: String!): CryptoPosition @requireAuth
  }

  input CreateCryptoPositionInput {
    userId: String!
    status: String!
    symbol: String!
    algorithm: String!
    amount: Float!
    test: Boolean!
  }

  input UpdateCryptoPositionInput {
    userId: String
    status: String
    symbol: String
    algorithm: String
    amount: Float
    test: Boolean
  }

  type Mutation {
    createCryptoPosition(input: CreateCryptoPositionInput!): CryptoPosition!
      @requireAuth
    updateCryptoPosition(
      id: String!
      input: UpdateCryptoPositionInput!
    ): CryptoPosition! @requireAuth
    deleteCryptoPosition(id: String!): CryptoPosition! @requireAuth
  }
`
