const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const { students } = require('./data/students');
const { projects } = require('./data/projects');

const dotEnv = require('dotenv');

dotEnv.config();
function rnd(x) {
	return Math.floor(Math.random() * x + x);
}

// see _images/06-add-student-solution.png

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
		createStudent(input: CreateStudentInput): Student!
	}

	input CreateProjectInput {
		name: String!
		completed: Boolean!
	}
	input CreateStudentInput {
		name: String!
		email: String!
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
	Project: {
		name: () => {
			return `PROJECT - ${Math.floor(Math.random() * 100000 + 100000)}`;
		},
	},
	Mutation: {
		createProject: (parent, args) => {
			console.log('input', args.input);
			const input = args.input;
			const project = { ...input, id: rnd(100000) };
			projects.push(project);
			return project;
		},
		createStudent: (parent, args) => {
			console.log('input', args.input);
			const input = args.input;
			const student = { ...input, id: rnd(100000) };
			students.push(student);
			return student;
		},
	},
};
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server06-add-student-solution running at port ${url}`));
