const { ApolloServer, gql } = require('apollo-server');

// use .env for PORT at this stage
const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		"""
		This is field level comment in docs - better example in server02 as there are more root types.
		"""
		hello: String # comment
	}
	# EXERCISES...
	# schema is included by default but shows why query is a reserved work in playground
	# rename Query to Q...?
	# comment out schema {}...?
	# remove resolver hello...?
	# use hello: String! and change resolver accordingly.
	# look at DFev > Network tab... more detail in Server01.js
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

server.listen({ port: PORT }).then(({ url }) => console.log(`Server01 running at port ${url}`));
