const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		greet(firstName: String!): String!
	}
	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		greet: (parent, args, context, info) => {
			console.log(args.firstName);
			return `Hello ${args.firstName}`;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => console.log(`Server running at port ${url}`));

// EXPERIMENTS:
// Can we use any variable instead of typeDefs or resolvers?
// Do we need the schema field with this set up?
// Can we change Query to Q? Can we do this if we remove the schema field?
// Change the getMessage to something else? Does it work? How do we fix this?
