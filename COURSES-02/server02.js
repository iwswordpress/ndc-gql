const { ApolloServer, gql } = require('apollo-server');
const { users } = require('./data/users');
const { tasks } = require('./data/tasks');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		users: [User!]
		tasks: [Task!]
	}

	type User {
		id: ID! # general comment
		name: String!
		email: String!
		tasks: [Task!]
	}

	type Task {
		id: ID!
		name: String!
		completed: Boolean!
		user: User!
	}

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		users: () => {
			return users;
		},
		tasks: () => {
			return tasks;
		},
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server02 running at port ${url}`));

/*

query GetAllUsers {
  allUsers: users {
    id
    name
    email
  }
}

query GetAllUsersTasks {
  allUsers: users {
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


*/
