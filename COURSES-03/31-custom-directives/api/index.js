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
	context: ({ req }) => {
		console.log('index.js > HEADERS > NDC', req.headers.ndc);
		console.log('index.js ', req.body.query);
		return {
			user: { id: 1, firstName: 'maurice', token: 'TOKEN-MAURICE', role: 'ADMIN', customNDCHeader: req.headers.ndc },
		};
	},
});

server.listen({ port: 5000 }).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
