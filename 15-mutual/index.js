const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		cat(name: String!): Cat!
		owner(name: String!): Owner!
	}

	type Owner {
		firstName: String!
		cat: Cat!
	}
	type Cat {
		firstName: String!
		age: Int
		owner: Owner!
	}
`;

const resolvers = {
	Query: {
		cat: (parent, args, ctx, info) => {
			console.log('Query > cat > parent: ', parent);
			console.log('Query > cat > args.name: ', args.name);
			console.log('Query > cat > ctx: ', ctx.isLoggedIn);
			const catName = args.name;
			return {
				firstName: catName,
				age: 3,
				// owner: { firstName: 'Sally', cat: 'Mika' },
				owner: {},
			};
		},
		owner: (parent, args, ctx, info) => {
			console.log('Query > owner > parent: ', parent);
			console.log('Query > owner > args.name: ', args.name);
			console.log('Query > owner > ctx: ', ctx.isLoggedIn);
			return {
				firstName: args.name,
				// cat: 'Timmy',
				cat: {},
			};
		},
	},
	Owner: {
		firstName: (parent, args, ctx) => {
			console.log('Owner > firstName > ctx isLoggedIn ', ctx.isLoggedIn);
			console.log('Owner > firstName > parent', parent);
			return Math.floor(Math.random() * 100 + 1);
		},
	},
	Cat: {
		firstName: (parent, args, ctx) => {
			console.log('Cat > firstName > ctx isLoggedIn ', ctx.isLoggedIn);
			console.log('Cat > firstName > parent', parent);
			return Math.floor(Math.random() * 100 + 100);
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
