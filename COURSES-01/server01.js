const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const dotEnv = require('dotenv');

dotEnv.config();

const typeDefs = gql`
	type Query {
		# https://github.com/graphql/graphql-js/issues/1324 - loose coercion for results

		hello: String!
		# test(x: Int!): String!
		# getError: ID! # used to show errors still give 200 status code
		# getNum: Int
		# list: [String]
		# list: [String]!
		# list: [Int!]!
		# list: [Boolean!]!
		# restAPI(id: Int): String
		# restAPI2(id: Int): String
		# me: Me
		# me(firstName: String!): Me
	}

	# type Me {
	# 	id: ID!
	# 	stack: String!
	# }

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query ## Query could be changed to anything else but not advised.
	}
`;

const resolvers = {
	Query: {
		// we can have a Schema type without resolver, defaults to null, but not a resolver with no Schema type
		hello: () => 'HELLO!', // change to return a string
		// test: (parent, args, context, info) => `Hello World! ${Math.floor(Math.random() * args.x + args.x)}`,
		// getNum: (parent, args, context, info) => {
		// 	return Math.floor(Math.random() * 100);
		// },
		// list: (parent, args, context, info) => {
		// 	return ['a'];
		// },
		// restAPI: async (parent, args, context, info) => {
		// 	console.log('args.id:', args.id);
		// 	const course = await fetch(`https://randomuser.me/api`);
		// 	const result = await course.json();
		// 	console.log(result.results[0].name.first);
		// 	const firstName = result.results[0].name.first;
		// 	console.log(`firstName: ${firstName}`);
		// 	return firstName;
		// },
		// restAPI2: async (parent, args, context, info) => {
		// 	console.log('args.id:', args.id);
		// 	const course = await fetch(`https://jsonplaceholder.typicode.com/users/${args.id}`);
		// 	const result = await course.json();
		// 	const fullName = result.name;
		// 	console.log(`fullName: ${fullName}`);
		// 	return fullName;
		// },
		// me: (parent, args, context, info) => {
		// 	console.log(args.firstName);
		// 	return { id: 1, stack: `JS` };
		// },
		// me: (parent, args, context, info) => {
		// 	console.log(args.firstName);
		// 	return { id: 1, stack: `${args.firstName}'s main skill is JS` };
		// },
	},
};

// Exercises
// Add more fields (location, job, etc) to Me and adjust resolver.
// In schema for list, ensure that a list must be returned, it can be empty and have nulls.
// In schema for list, ensure that a list must be returned, it can be empty but if not it must be of String type.
// Use restAPI that uses a REST API

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });
// console.log(typeDefs);
server.listen({ port: PORT }).then(({ url }) => console.log(`Server01 running at port ${url}`));
