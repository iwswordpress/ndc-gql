const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		// we can get custom headers and pass them to API if needed
		console.log('index.js > HEADERS > NDC', req.headers.ndc);
		// we can see query and many other properties...
		console.log('index.js > query sent ', req.body.query);
		// DO AUTH...return credentials...
		return {
			user: {
				id: 1,
				firstName: 'Larry',
				token: 'TOKEN-LARRY',
				role: 'ADMIN',
				customNDCHeader: req.headers.ndc,
			},
		};
	},
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀 index.js ready at ${url}`);
});
