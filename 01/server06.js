// Mutation with Query Tab and HTML 06-add-project.html in client folder.
// Use of input Type.

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
		completed: Boolean!
	}

	type Mutation {
		createProject(input: CreateProjectInput): Project!
		# if we add ! to CreateProjectInput above it won't cause error but if we spec! and miss it out it will cause error

		#  "message": "Variable "$input" of type "CreateProjectInput" used in position expecting type "CreateProjectInput!".",
	}
	# input type allowed in Mutations not Queries
	# http://spec.graphql.org/June2018/#sec-Variables-Are-Input-Types
	# general practice is not to use them for Queries

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

	Mutation: {
		createProject: (parent, args) => {
			const name = args.input.name;
			const completed = args.input.completed;
			// const project = { id: rnd(100000), name, completed };
			const project = { ...args.input, id: rnd(100000) };
			projects.push(project);
			console.log(colors.bgRed.inverse('Added project is'), project);
			return project;
		},
	},
};
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server06 running at port ${url}`)));

/*

mutation AddProject($input:CreateProjectInput){
  createProject(input:$input){
    id
    name
    completed
  }
}

QUERY VARIABLES TAB

{
  "input": {"name": "TESTCASE 4", "completed": true}
}


In memory so one can see it here:

{
  projects {
    id
    name
  }
}

*/
