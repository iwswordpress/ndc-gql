// Use of resolvers for Project as demo rather than getting Project data.
// See effect of commenting out some fields and effect when filed is required.
// Any template queries are placed at bottom of file.

const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');
const { students } = require('./data/students');
const { projects } = require('./data/projects');

// Port variable in .env file
const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		students: [Student!]
		projects: [Project!]
	}

	type Student {
		id: ID!
		name: String!
		email: String!
		projects: [Project!]
		# projects: [Int!]
	}

	type Project {
		id: ID
		name: String
		completed: Boolean
	}

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		students: (parent, args, context, info) => {
			console.log(colors.green.inverse('STUDENT'));
			console.log(colors.green.inverse('----------------'));

			return students;
		},
		projects: (parent, args, context, info) => {
			console.log(projects);
			return projects;
		},
	},
	Project: {
		id: (parent, args, context, info) => {
			console.log(colors.blue.inverse('Project > id:'), parent);
			const project = projects.filter((project) => project.id == parent);
			console.log('project.id', project[0].id);
			return project[0].id;
		},
		name: (parent, args, context, info) => {
			const project = projects.filter((project) => project.id == parent);
			console.log('project.name', project[0].name);
			return project[0].name;
		},
		completed: (parent, args, context, info) => {
			const project = projects.filter((project) => project.id == parent);
			console.log('project.completed', project[0].completed);
			return project[0].completed;
		},
	},

	// --- EXERCISES

	// Comment out resolver Project.id and see what happens.
	// Make Project.id required. What difference does it make?
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server03 running at port ${url}`)));

/*

query{
  students{
    id
    name
    email
    projects{
      id
      name
      completed
    }
  }
}

*/
