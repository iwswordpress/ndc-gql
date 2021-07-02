const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		cat(name: String!): Cat!
		owner(name: String!): Owner!
	}

	type Owner {
		ownerName: String!
		cat: Cat!
		dog: String
	}
	type Cat {
		catName: String!
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
				catName: catName,
				age: 3,
				owner: { ownerName: 'Sally', dog: 'Mika' },
			};
		},
		owner: (parent, args, ctx, info) => {
			console.log('Query > owner > parent: ', parent);
			console.log('Query > owner > args.name: ', args.name);
			console.log('Query > owner > ctx: ', ctx.isLoggedIn);
			return {
				firstName: args.name,
				cat: 'ANOTHER CAT',
			};
		},
	},
	// Owner: {
	// 	firstName: (parent, args, ctx) => {
	// 		console.log('Owner > firstName > ctx isLoggedIn ', ctx.isLoggedIn);
	// 		console.log('Owner > firstName > parent', parent);
	// 		const ownerName = 'OWNER-' + Math.floor(Math.random() * 100 + 1);
	// 		return ownerName;
	// 	},
	// },
	// Cat: {
	// 	firstName: (parent, args, ctx) => {
	// 		console.log('Cat > firstName > ctx isLoggedIn ', ctx.isLoggedIn);
	// 		console.log('Cat > firstName > parent', parent);
	// 		const catName = 'CAT-' + Math.floor(Math.random() * 100 + 1);
	// 		return catName;
	// 	},
	// },
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: { isLoggedIn: true },
});
// defaults to port 4000
server.listen({ port: 5000 }).then(({ url }) => console.log(`Server running at port ${url}`));
