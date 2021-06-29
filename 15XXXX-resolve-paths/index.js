const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		hello(name: String): String
		user: User
	}

	type User {
		id: ID!
		username: String
		firstLetterOfUsername: String
	}
`;

const resolvers = {
	User: {
		id: (parent, args, ctx) => {
			console.log('User > id > ctx isLoggedIn ', ctx.isLoggedIn);
			console.log(`in User > id resolver with parent`, parent);
			return Math.floor(Math.random() * 100 + 1);
		},
		username: (parent, args, ctx) => {
			console.log('User > username > ctx isLoggedIn ', ctx.isLoggedIn);
			console.log(`in User > username resolver with parent`, parent);
			return 'Harry';
		},
		firstLetterOfUsername: (parent, args, ctx) => {
			console.log('User > firstetter > ctx isLoggedIn ', ctx.isLoggedIn);
			console.log(`User > firstLetter parent`, parent);
			// when Harry cannot access this value only parents
			return parent.username ? parent.username[0] : null;
		},
	},
	Query: {
		hello: (parent, args) => {
			return `hey ${args.name}`;
		},
		user: (parent) => {
			// top level so no parent
			console.log(`user > parent `, parent);

			return {
				id: 1,
				username: 'tom', // try empty object
			};
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: { isLoggedIn: true },
});
// defaults to port 4000
server.listen({ port: 5000 }).then(({ url }) => console.log(`Server running at port ${url}`));
