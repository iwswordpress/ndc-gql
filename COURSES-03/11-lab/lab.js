const { ApolloServer, gql } = require('apollo-server');
const rnd = require('./util/rnd');

console.log(rnd());
const typeDefs = gql`
	type Query {
		greet(firstName: String!): String!
		# greet(firstName: String): String
		getQuery(sort: String, order: String, limit: Int): String
		# details: Int
		# hobbies: [Int]
		# me: Me
	}
	# type Me {
	# 	id: ID!
	# 	stack: String!
	# }
	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;

const resolvers = {
	Query: {
		greet: (parent, args, context, info) => {
			console.log(args.firstName);
			return `Hello ${args.firstName} ${rnd()}`;
		},
		getQuery: (parent, args, context, info) => {
			console.log(args.sort, args.order);
			return `Do query with sort=${args.sort}, order=${args.order} and limit=${args.limit} ---> return dataset`;
		},
		// details: (parent, args, context, info) => {
		// 	return Math.floor(Math.random() * 100);
		// },
		// hobbies: (parent, args, context, info) => {
		// 	return [rnd(), rnd()];
		// },
		// me: (parent, args, context, info) => {

		// 	return { id: 1, stack: 'JS' };
		// },
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => console.log(`Server running at port ${url}`));

// EXPERIMENTS:
// Can we use any variable instead of typeDefs or resolvers?
// Do we need the schema field with this set up?
// Can we change Query to Q? Can we do this if we remove the schema field?
// Change the getMessage to something else? Does it work? How do we fix this?
