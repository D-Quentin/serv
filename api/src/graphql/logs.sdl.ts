export const schema = gql`
  type Log {
    id: Int!
    status: Int!
    message: String!
    createdAt: DateTime!
    CryptoPosition: CryptoPosition!
    cryptoPositionId: String!
  }

  type Query {
    logs: [Log!]! @requireAuth
    log(id: Int!): Log @requireAuth
  }

  input CreateLogInput {
    status: Int!
    message: String!
    cryptoPositionId: String!
  }

  input UpdateLogInput {
    status: Int
    message: String
    cryptoPositionId: String
  }

  type Mutation {
    createLog(input: CreateLogInput!): Log! @requireAuth
    updateLog(id: Int!, input: UpdateLogInput!): Log! @requireAuth
    deleteLog(id: Int!): Log! @requireAuth
  }
`
