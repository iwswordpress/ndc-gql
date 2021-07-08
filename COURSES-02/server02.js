const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./resolvers');

const dotEnv = require('dotenv');

dotEnv.config();

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

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server02 running at port ${url}`));
