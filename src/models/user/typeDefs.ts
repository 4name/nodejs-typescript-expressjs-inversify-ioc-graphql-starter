export const typeDefs = `
  type User {
    _id: ID!
    name: String!
    lastName: String!
    email: String!
    password: String!
    birthDate: String!
  }
  type Query {
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, lastName: String!, email: String!, password: String!, birthDate: String!): User
    updateUser(_id: ID!, name: String, lastName: String, email: String, password: String, birthDate: String): User
    deleteUser(_id: ID!): User
  }
`;
