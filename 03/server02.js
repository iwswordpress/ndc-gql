const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const dotEnv = require('dotenv');

dotEnv.config();

const resolvers = require('./resolvers');

const typeDefs = gql`
	type Query {
		users: [User!]
		tasks: [Task!]
		getTaskById(id: ID!): Task
		getUserById(id: ID!): User!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		tasks: [Task!]
	}

	type Task {
		id: ID!
		name: String!
		completed: Boolean!
		user: User
	}

	type Mutation {
		createTask(input: CreateTaskInput): Task!
	}

	input CreateTaskInput {
		name: String!
		completed: Boolean!
		userId: Int!
	}
	schema {
		query: Query
		mutation: Mutation
	}
`;

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server02 running at port ${url}`));

/*

query{
  users{
    id
    name
    email
    tasks{
      id
      name
      completed
    }
  }
}

query {
  getUserById(id: 1) {
    id
    name
    email
    tasks {
      id
      name
      completed
    }
  }
}

*/
