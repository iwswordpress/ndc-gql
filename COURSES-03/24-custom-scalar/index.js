const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');

const typeDefs = gql`
	scalar DateTime

	type Query {
		"""
		Use the custom scalar DateTime
		"""
		getTime: DateTime
		getTimeString: String
		# change to String to see effect of custom scalar type
	}
`;
// Run this query
// query demoCustomScalar{
//   withCustomScalar:getTime
//   withString:getTimeString
// }
const resolvers = {
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'A date and time, represented as an ISO-8601 string',
		serialize: (value) => value.toISOString(), // output
		parseValue: (value) => new Date(value), // input
		parseLiteral: (ast) => new Date(ast.value), // input - this is the Abstract Syntax Tree found on the 4th info argument.
	}),

	Query: {
		getTime: () => new Date(),
		getTimeString: () => new Date(),
		// new Date() will return integer "1625670968724" but our custom scalar converts this to ISO Date
	},
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(5000).then((serverInfo) => console.info(`Server running at ${serverInfo.url}`));
