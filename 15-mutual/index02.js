const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		cat(name: String!): Cat!
		carer(name: String!): Carer!
	}

	type Carer {
		carerName: String!
		cat: Cat
		dog: String
	}
	type Cat {
		catName: String!
		age: Int
		carer: Carer!
	}
`;

// We have the following OBJECT values in our schema:
// Query.cat
// Query.carer
// Carer.cat
// Cat.carer
// all the others resolve to SCALAR
// We will need to create resolvers for thes.
// Without them we will get nulls.

const resolvers = {
	Query: {
		cat: (parent, args, ctx, info) => {
			console.log('Query > cat > parent: ', parent);
			console.log('Query > cat > args.name: ', args.name);
			console.log('Query > cat > ctx: ', ctx.isLoggedIn);

			return { catName: args.name, age: 22, carer: { carerName: 'Query.cat.SALLY', dog: 'FIDO' } };
			// return {  };
		},
		carer: (parent, args, ctx, info) => {
			console.log('Query > owner > parent: ', parent);
			console.log('Query > owner > args.name: ', args.name);
			console.log('Query > owner > ctx: ', ctx.isLoggedIn);
			return {
				carer: `Query.carer args.name: ${args.name}`,
				dog: 'Query.owner.TED',
			};
		},
	},
	// Cat: {
	// 	catName: (parent, args, ctx) => {
	// 		console.log('Cat > catName > ctx isLoggedIn ', ctx.isLoggedIn);
	// 		console.log('Cat > catName > parent', parent);
	// 		const catName = `Cat.catName`;
	// 		return catName;
	// 	},
	// 	carer: (parent, args, ctx) => {
	// 		console.log('Cat > carerName > ctx isLoggedIn ', ctx.isLoggedIn);
	// 		console.log('Cat > carerName > parent', parent);
	// 		const catName = `Cat.carerName`;
	// 		return catName;
	// 	},
	// },
	// Carer: {
	// 	carerName: (parent, args, ctx) => {
	// 		console.log('Carer > carerName > ctx isLoggedIn ', ctx.isLoggedIn);
	// 		console.log('Carer > carerName > parent', parent);
	// 		const catName = `Carer.carerName`;
	// 		return catName;
	// 	},
	// 	cat: () => {
	// 		return {
	// 			catName: 'Carer.cat',
	// 			age: 200,
	// 			carer: { carerName: 'Carer.cat.carer' },
	// 		};
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
