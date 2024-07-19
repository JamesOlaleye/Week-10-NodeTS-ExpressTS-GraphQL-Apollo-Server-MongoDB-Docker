import User from '../model/userModel';

const typeDefs = `#graphql
type Query {
   Users: [User!]!
   User (input: GetInput!): User
   Notes: [Note!]!
   Note (id: String!): Note
}

type User {
    id: ID
    fullName: String
    email: String
    gender: String
    phone: String
    address: String
    password: String
  }

  input GetInput{
    id: String
  }

type Note {
  title: String
  description: String
  dueDate: String
  status: String
  userId: String
}


type Mutation {
  signup(input: SignupInput): User!
  login(input: LoginInput): User!
  createNote (input: NoteInput): Note!
  updateNote (id: String!, input: NoteInput): Note!
  deleteNote (id: String!): Note!
}

input SignupInput {
  fullName: String!
  email: String!
  gender: String!
  phone: String!
  address: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

input NoteInput {
  title: String
  description: String
  dueDate: String
  status: String
  userId: String
}

input deleteNoteInput {
  id: String!
}


`;
export default typeDefs;