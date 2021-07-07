const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');

const typeDefs = gql`
	scalar DateTime

	type Query {
		"""
		Use the custom scalar DateTime
		"""
		getTime: DateTime # returns integer "1625670968724"
	}
`;

const resolvers = {
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'A date and time, represented as an ISO-8601 string',
		serialize: (value) => value.toISOString(), // output
		parseValue: (value) => new Date(value), // input
		parseLiteral: (ast) => new Date(ast.value), // input
	}),

	Query: {
		getTime: () => new Date(),
	},
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(5000).then((serverInfo) => console.info(`Server running at ${serverInfo.url}`));
