const { ApolloServer, gql } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		test(x: Int): String!
		getError: ID! # used to show errors still give 200 status code
		# details: Int
		# hobbies: [Int]
		# me: Me
	}
	# type Me {
	# 	id: ID!
	# 	stack: String!
	# }
	# }
	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		test: (parent, args, context, info) => `Hello World! ${Math.floor(Math.random() * args.x + args.x)}`,
		// details: (parent, args, context, info) => {
		// 	return Math.floor(Math.random() * 100);
		// },
		// hobbies: (parent, args, context, info) => {
		// 	return [rnd(), rnd()];
		// },
		// me: (parent, args, context, info) => {
		// 	return { id: 1, stack: 'JS' };
		// },
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server running at port ${url}`));
