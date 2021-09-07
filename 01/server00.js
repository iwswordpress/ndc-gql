const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

// Port variable in .env file
const dotEnv = require('dotenv');
dotEnv.config();

// ES6 template literal using back tick next to 1 on keyboard
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
// https://codeburst.io/javascript-what-are-tag-functions-97682f29521b

// We can write gql(`...`) which resembles our regular functions.
// With () we lose IDE highlighting and the usual format for template tag functions is no bracket.

const typeDefs = gql`
	type Query {
		"""
		This is field level comment in docs - better example in server02 as there are more root types.
		"""
		hello: String! # a comment
		# ID, Boolean, String, Int, Float
	}

	# --- EXERCISES

	# rename Query to Q in typeDefs and schema...Crash?
	# comment out schema {}...Crash?
	# remove resolver hello...Crash?
	# use hello: String! and change resolver to give null and run query in playground.
	# look at Dev > Network tab... more detail in Server01.js
	# add subfields and note status code - 400
	# throw Error server side by making hello: String! with resolver giving null (as we did a few exercises ago) and run query in playground. In DEV > Netrwork look at status code - 200.

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query # Query could be changed to anything else but not advised.
	}
`;

const resolvers = {
	Query: {
		hello: () => 'HELLO!',
	},
};

const PORT = process.env.PORT || 5000; // default port is 4000
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(colors.cyan.inverse(`Server00 running at port ${url}`)));
