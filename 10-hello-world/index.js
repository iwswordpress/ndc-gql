const { ApolloServer, gql } = require('apollo-server');
// Tagged templates

// A more advanced form of template literals are tagged templates.

// Tags allow you to parse template literals with a function. The first argument of a tag function contains an array of string values. The remaining arguments are related to the expressions.

// The tag function can then perform whatever operations on these arguments you wish, and return the manipulated string.

const typeDefs = gql`
	type Query {
		getMessage: String!
	}

	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		getMessage: () => 'Hello World!',
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => console.log(`Server running at port ${url}`));

// EXPERIMENTS:
// Can we use any variable instead of typeDefs or resolvers?
// Do we need the schema field with this set up?
// Can we change Query to Q? Can we do this if we remove the schema field?
// Change the getMessage to something else? Does it work? How do we fix this?
