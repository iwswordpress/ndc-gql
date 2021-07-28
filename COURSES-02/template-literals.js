const { ApolloServer, gql } = require('apollo-server');

const { students } = require('./data/students');
const { projects } = require('./data/projects');

const dotEnv = require('dotenv');

dotEnv.config();
// These constants can be imported...
const STUDENT = `	type Student {
		"""
		id comments here
		"""
		id: ID! # general comment
		name: String!
		email: String!
		projects: [Project!]
	}`;

const PROJECTS = `	type Project {
		id: ID!
		name: String!
		completed: Boolean!
	}
`;

const typeDefs = gql`
	type Query {
		students: [Student!]
		projects: [Project!]
	}

	${STUDENT}
	
	${PROJECTS}

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
			return projects;
		},
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server running at port ${url}`));
