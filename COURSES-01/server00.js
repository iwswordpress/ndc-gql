const { ApolloServer, gql } = require('apollo-server');

// use .env for PORT at this stage
const dotEnv = require('dotenv');
dotEnv.config();

// ES6 template literal using back tick next to 1 on keyboard
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

// We can write gql(`...`) which resembles our regular functions.
// With () we lose IDE highlighting and the usual format for template tag functions is no bracket.

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
	# use hello: String! and change resolver accordingly. GQL defaults to null
	# look at Dev > Network tab... more detail in Server01.js
	# add subfields and note status code - 400
	# throw Error server side and note status code - 200

	schema {
		query: Query ## Query could be changed to anything else but not advised.
	}
`;

const resolvers = {
	Query: {
		hello: () => 'HELLO!',
	},
};

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server01 running at port ${url}`));
