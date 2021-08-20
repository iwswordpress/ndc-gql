const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const AuthDirective = require('./AuthDirective');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	schemaDirectives: {
		auth: AuthDirective,
	},
	formatError(err) {
		if (!err.originalError) {
			return err;
		}
		const data = err.originalError.data;
		const message = err.message || 'An error occurred.';
		const code = err.originalError.code || 500;
		return { message: message, status: code, data: data };
	},
	context: ({ req }) => {
		// we can get custom headers and pass them to API if needed
		console.log('index.js > HEADERS > NDC', req.headers.ndc);
		// we can see query and many other properties...
		// console.log('index.js > query sent ', req.body.query);
		// DO AUTH...return credentials...
		return {
			user: { id: 1, firstName: 'Larry', token: 'TOKEN-LARRY', role: 'ADMIN', customNDCHeader: req.headers.ndc },
			// user: { id: 2, firstName: 'Rita', token: 'TOKEN-RITA', role: 'USER', customNDCHeader: req.headers.ndc },
		};
	},
});

server.listen({ port: 5000 }).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
