// Mutation type to perform update, delete or insert.

const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const { students } = require('./data/students');
const { projects } = require('./data/projects');

const dotEnv = require('dotenv');

dotEnv.config();

function rnd(x) {
	return Math.floor(Math.random() * x + x);
}

const typeDefs = gql`
	type Query {
		students: [Student!]
		projects: [Project!]
		getProjectById(id: ID!): Project
		getStudentById(id: ID!): Student!
	}

	type Student {
		id: ID!
		name: String!
		email: String!
		projects: [Project!]
	}

	type Project {
		id: ID!
		name: String!
		completed: Boolean
	}

	type Mutation {
		createProject(name: String, completed: Boolean): String
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;

const resolvers = {
	Query: {
		students: () => {
			return students;
		},
		projects: () => {
			console.log(projects);
			return projects;
		},
		getProjectById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const project = projects.find((project) => project.id == args.id);
			return project;
		},
		getStudentById: (parent, args) => {
			console.log('id is serialized to --->', typeof args.id);
			const student = students.find((student) => student.id == args.id);
			return student;
		},
	},

	Project: {
		name: () => {
			console.log(`---> Project.name returning TEST PROJECT ${Math.floor(Math.random() * 100000 + 100000)}`);
			return `TEST PROJECT - ${Math.floor(Math.random() * 100000 + 100000)}`;
		},
	},
	Mutation: {
		createProject: (parent, args, context, info) => {
			console.log('input', args);
			const inputName = args.name;
			const inputCompleted = args.completed;
			console.log(colors.green('Data sent:'), inputName, inputCompleted);
			const id = rnd(100000);
			const newProject = { id, inputName, inputCompleted };

			console.log(colors.green.italic('Do INSERT with '), newProject);

			return `Project with id: ${id}, name: ${inputName}, completed: ${inputName ? 'YES' : 'NO'}`;
		},
	},
};
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server05 running at port ${url}`)));

/*

-- add a new project

mutation{
  createProject(name:"TEST",completed: false)
}

*/
