const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');

// From https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#defining-custom-scalar-logic
// $ npm install graphql-type-json an eacmple libary

// There are many npm packages that will do all this for you
// e.g. https://www.npmjs.com/package/graphql-scalars
// Can be very useful for Dates. e.g. https://www.npmjs.com/package/graphql-iso-date and there are many more.

// Basic schema
const typeDefs = gql`
	scalar Odd

	type MyType {
		oddValue: Odd
	}
`;

// Validation function
function oddValue(value) {
	return value % 2 === 1 ? value : null;
}

const resolvers = {
	Odd: new GraphQLScalarType({
		name: 'Odd',
		description: 'Odd custom scalar type',
		serialize: oddValue, // value coming in
		parseValue: oddValue, // output of value
		parseLiteral(ast) {
			// output of value
			if (ast.kind === Kind.INT) {
				return oddValue(parseInt(ast.value, 10));
			}
			return null;
		},
	}),
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
