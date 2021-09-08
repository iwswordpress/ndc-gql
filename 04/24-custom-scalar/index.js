const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const colors = require('colors');

const typeDefs = gql`
	scalar DateTime

	type Query {
		"""
		Use the custom scalar DateTime
		"""
		getTime: DateTime
		getTimeString: String
	}
`;

const resolvers = {
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'A date and time, represented as an ISO-8601 string',
		serialize: (value) => value.toISOString(), // output
		parseValue: (value) => new Date(value), // value from resolver
		parseLiteral: (ast) => new Date(ast.value), // value sent in query - this is the Abstract Syntax Tree found on the 4th info argument. Changes could be applied here too if needed.
	}),

	Query: {
		getTime: () => new Date(),
		getTimeString: () => new Date(),
		// new Date() will return integer "1625670968724" but our custom scalar converts this to ISO Date
	},
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(5000).then((serverInfo) => console.info(`Server running at ${serverInfo.url}`));
/*

Run this query

query demoCustomScalar{
  withCustomScalar:getTime
  withString:getTimeString
}

*/
