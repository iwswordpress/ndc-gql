// Use of resolvers for Project.

const { ApolloServer, gql } = require('apollo-server');
const { students } = require('./data/students');
const { projects } = require('./data/projects');

// Any template queries are placed at bottom of file.

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
		students: () => {
			return students;
		},
		projects: () => {
			console.log(projects);
			return projects;
		},
	},
	Project: {
		id: (parent, args) => {
			console.log(args);
			return 100;
		},
		name: () => {
			console.log(`---> Project.name returning TEST Project ${Math.floor(Math.random() * 100000 + 100000)}`);
			return `TEST Project - ${Math.floor(Math.random() * 100000 + 100000)}`;
		},
		completed: () => true,
	},

	// --- EXERCISES

	// Remove Project in resolver and see what happens - you will need to change the type Student.projects to return a list not an object.
	// Remove resolver Project.id and see what happens. If type Project.id is required, what difference does it make?
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server03 running at port ${url}`));

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
