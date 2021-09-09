// User > Task resolution with Query Variable Tab.

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

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		users: (parent, args) => {
			return users;
		},
		tasks: () => {
			console.log(tasks);
			return tasks;
		},
		getTaskById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const task = tasks.find((task) => task.id == args.id);
			return task;
		},
		getUserById: (parent, args) => {
			console.log('Query > getUserById - args:', args);
			console.log('id is serialized to --->', typeof args.id);
			const user = users.find((user) => user.id == args.id);
			return user;
		},
	},
	Task: {
		user: (parent) => {
			// we can destucture but left in for teaching purposes
			console.log('In Task.user');
			console.log('Task.user > parent.userId', parent.userId);
			const user = users.find((user) => user.id === parent.userId);
			console.log('user is', user);
			return user;
		},
	},
	User: {
		tasks: (parent, args) => {
			console.log(colors.yellow.inverse('In User.tasks'));
			console.log('User.tasks > parent.userId = userId: ', parent.id);
			const allTasks = tasks.filter((task) => task.userId === parent.id);
			console.log(colors.green(`Tasks for userId=${parent.id}`));
			console.log(allTasks);
			return allTasks;
		},
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server05 running at port ${url}`)));

/*

query GetUserById($id: ID!) {
  getUserById(id: $id) {
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

{
  "id": 1
}

*/
