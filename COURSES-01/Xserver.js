const { ApolloServer, gql } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		test: String!
		testNum(x: Int): String!
		getError: ID! # used to show errors still give 200 status code
	}

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		test: () => 'Hello NDC',
		testNum: (parent, args, context, info) => `Hello World! ${Math.floor(Math.random() * args.x + args.x)}`,
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server running at port ${url}`));
