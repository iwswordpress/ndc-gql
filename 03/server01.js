// We carry on from 02.
// Use of extend type Query to demonstrate it.
// Can only have one User type.

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

	# we can extend Query (and Mutations) as follows.
	# This will be of use in the Part to combine many Schema files.

	extend type Query {
		hello: String
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

const resolvers = {
	Query: {
		hello: () => 'HELLO',
		users: () => {
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
		// name: () => {
		// 	console.log(`---> Task.name returning TEST TASK ${Math.floor(Math.random() * 100000 + 100000)}`);
		// 	return `TEST TASK - ${Math.floor(Math.random() * 100000 + 100000)}`;
		// },
	},
	User: {
		tasks: (parent) => {
			console.log('In User.user');
			console.log('User.tasks > parent.userId', parent.id);
			const allTasks = tasks.filter((task) => task.userId === parent.id);
			return allTasks;
		},
	},
	Mutation: {
		createTask: (parent, args) => {
			console.log('input', args.input);
			const input = args.input;
			const task = { ...input, id: Math.floor(Math.random() * 10000) };
			tasks.push(task);
			return task;
		},
	},
};
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server01 running at port ${url}`)));
