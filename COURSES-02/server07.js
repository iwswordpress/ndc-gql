const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const JSON_URL = 'http://localhost:4011';

const { users } = require('./data/users');

let tasks = [];
async function getAllTasks() {
	const data = await fetch(`${JSON_URL}/tasks`);
	const allTasks = await data.json();
	tasks = allTasks;
	// console.log(tasks);
}
getAllTasks();

const dotEnv = require('dotenv');

dotEnv.config();

// We can see order of resolving as top level done first then child query.
// !!! N+1 problem...
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

const resolvers = {
	Query: {
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
			console.log('Can now perform any CRUD...');
			const input = args.input;
			const task = { ...input, id: Math.floor(Math.random() * 10000) };
			tasks.push(task);
			return task;
		},
	},
};
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server07 running at port ${url}`));

/*

query {
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
