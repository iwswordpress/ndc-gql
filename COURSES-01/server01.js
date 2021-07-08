const { ApolloServer, gql } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		test: String!
		getError: ID! # used to show errors still give 200 status code
	}
	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		test: () => `Hello World! ${Math.floor(Math.random() * 100000 + 100000)}`,
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server running at port ${url}`));
