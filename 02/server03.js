// We can resolve task > user as we have resolvers for Task type.

const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');
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
			// console.log(tasks);
			return tasks;
		},
	},
	Task: {
		user: (parent) => {
			// we can destucture but left in for teaching purposes
			console.log(colors.yellow.inverse('In Task.user'));
			console.log('Task.user > parent.userId', parent.userId);
			const user = users.find((user) => user.id === parent.userId);
			console.log('user is', user);
			return user;
			// return { id: 100, name: 'OVERWRITTEN', email: 'replaced@test.com' };
		},
		// demos how field level resolvers overwrite top level resolver.
		// name: () => {
		// 	console.log(`---> Task.name returning TEST TASK ${Math.floor(Math.random() * 100000 + 100000)}`);
		// 	return `Task.name overwritten - ${Math.floor(Math.random() * 100000 + 100000)}`;
		// },
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server03 running at port ${url}`)));

/*

{
  tasks {
    id
    name
    completed
    user {
      id
      name
      email
    }
  }
}

*/
