const { ApolloServer, gql } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		hello: String # comment
		test(x: Int!): String!
		"""
		This is field level comment in docs - better example in server02 as there are more root types.
		"""
		getError: ID! # used to show errors still give 200 status code
		# details: Int
		# api: [String]
		# api: [String!]
		# api: [String]!
		# api: [String!]!
		# me: Me
	}
	# type Me {
	# 	id: ID!
	# 	stack: String!
	# }

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query ## Query could be changed to anything else but not advised.
	}
`;

const resolvers = {
	Query: {
		test: (parent, args, context, info) => `Hello World! ${Math.floor(Math.random() * args.x + args.x)}`,
		hello: () => 'null', // change to return a string
		// details: (parent, args, context, info) => {
		// 	return Math.floor(Math.random() * 100);
		// },
		// api: (parent, args, context, info) => {
		// 	return ['a'];
		// },
		// me: (parent, args, context, info) => {
		// 	return { id: 1, stack: 'JS' };
		// },
	},
};

// Exercises
// Add more fields (location, job, etc) to Me and adjust resolver.
// In schema for api, ensure that a list must be returned, it can be empty and have nulls.
// In schema for api, ensure that a list must be returned, it can be empty but if not it must be of String type.

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });
console.log(typeDefs);
server.listen({ port: PORT }).then(({ url }) => console.log(`Server running at port ${url}`));
