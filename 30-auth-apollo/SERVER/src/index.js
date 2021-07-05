const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	// context({ req }) {
	// 	const user = {
	// 		id: 100,
	// 		auth: true,
	// 		role: 'ADMIN',
	// 		token: 'ANAN776YUU',
	// 	};
	// 	return {  user };
	// },
	context({ req }) {
		const user = null;
		return { user };
	},
});

server.listen(5000).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
