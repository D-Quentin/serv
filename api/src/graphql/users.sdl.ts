export const schema = gql`
  type User {
    id: String!
    username: String!
    hashedPassword: String!
    salt: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
