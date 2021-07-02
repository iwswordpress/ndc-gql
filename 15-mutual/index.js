const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		cat(name: String!): Cat!
		owner(name: String!): Owner!
	}

	type Owner {
		ownerName: String!
		cat: Cat
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

			return { catName: args.name, age: 22, owner: { ownerName: 'Query.cat.SALLY' } };
			// return {  };
		},
		owner: (parent, args, ctx, info) => {
			console.log('Query > owner > parent: ', parent);
			console.log('Query > owner > args.name: ', args.name);
			console.log('Query > owner > ctx: ', ctx.isLoggedIn);
			return {
				ownerName: args.name,
				dog: 'Query.owner.TED',
			};
		},
	},
	Cat: {
		catName: (parent, args, ctx) => {
			console.log('Cat > catName > ctx isLoggedIn ', ctx.isLoggedIn);
			console.log('Cat > catName > parent', parent);
			const catName = `PARENT = ${parent.catName} > CAT.catName = ${Math.floor(Math.random() * 100 + 1)}`;
			return catName;
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
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: { isLoggedIn: true },
});
// defaults to port 4000
server.listen({ port: 5000 }).then(({ url }) => console.log(`Server running at port ${url}`));
