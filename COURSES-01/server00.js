const { ApolloServer, gql } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		"""
		This is field level comment in docs - better example in server02 as there are more root types.
		"""
		hello: String! # comment
	}
	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query ## Query could be changed to anything else but not advised.
	}
`;

const resolvers = {
	Query: {
		hello: () => null, // change to return a string
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });
// console.log(typeDefs);
server.listen({ port: PORT }).then(({ url }) => console.log(`Server01 running at port ${url}`));
