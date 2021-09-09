const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');
const { users } = require('./data/users');
const { tasks } = require('./data/tasks');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		users: [User] # can be null, can contain null but must be list.
		# users: [User!] # can be empty array, must be of type User if not empty.
		# users: [User]! # can be empty array, if not empty must be of type User.
		# users: [User!]! # can be empty, no nulls, must return array.
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
		user: User
	}

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		users: () => {
			return users;
			// return null;
			// return 3;
			// return [null];
			// return [
			// 	{
			// 		id: 2,
			// 		name: 'ted',
			// 		email: 'ted@test.com',
			// 	},
			// ];
		},
		tasks: () => {
			return tasks;
		},
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server02 running at port ${url}`)));

/*

query GetAllUsers {
  allUsers: users {
    id
    name
    email
  }
}

{
  users {
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
