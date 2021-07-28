const { ApolloServer, gql } = require('apollo-server');
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
		completed: Boolean!
	}

	type Mutation {
		createProject(input: CreateProjectInput): Project!
	}

	input CreateProjectInput {
		name: String!
		completed: Boolean!
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

	Student: {
		projects: (parent) => {
			console.log('In Student.user');
			console.log('Student.projects > parent.userId', parent.id);
			const allProjects = projects.filter((project) => project.id === parent.id);

			return allProjects;
		},
	},
};
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server05 running at port ${url}`));
