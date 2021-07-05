const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

// const user = {
// 	id: 100,
// 	email: 'craig@wpjs.co.uk',
// 	role: 'ADMIN',
// 	token: 'CGHnhgg555LLL',
// };

const user = null;
const server = new ApolloServer({
	typeDefs,
	resolvers,

	context({ req }) {
		return { user };
	},
});

server.listen(5000).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
