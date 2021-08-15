const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const JSON_SERVER = 'http://localhost:4010';

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
			console.log('In Query > cat');
			// console.log('Query > cat > parent: ', parent);
			// console.log('Query > cat > args.name: ', args.name);
			// console.log('Query > cat > ctx: ', ctx.isLoggedIn);

			return { catName: args.name, age: 3, carer: { carerName: 'Query.cat.SALLY', dog: 'FIDO' } };
			// return {  };
		},
		carer: (parent, args, ctx, info) => {
			console.log('In Query > carer');
			// console.log('Query > owner > parent: ', parent);
			// console.log('Query > owner > args.name: ', args.name);
			// console.log('Query > owner > ctx: ', ctx.isLoggedIn);
			return {
				carer: `Query.carer args.name: ${args.name}`,
				dog: 'Query.owner.TED',
				cat: { catName: 'Query.carer.cat', age: 55, carer: { carerName: Query.carer.cat.carer.carerName } },
			};
		},
	},
	Cat: {
		catName: (parent, args, ctx) => {
			console.log('In Cat > catName');
			// console.log('Cat > catName > ctx isLoggedIn ', ctx.isLoggedIn);
			// console.log('Cat > catName > parent', parent);
			const catName = `Cat.catName`;
			return catName;
		},
		age: (parent, args, ctx) => {
			console.log('In Cat > age');
			// console.log('Cat > age > ctx isLoggedIn ', ctx.isLoggedIn);
			// console.log('Cat > age > parent', parent);

			return Math.floor(Math.random() * 5000 + 1000);
		},
		carer: (parent, args, ctx) => {
			console.log('In Cat > carer');
			// console.log('Cat > carerName > ctx isLoggedIn ', ctx.isLoggedIn);
			// console.log('Cat > carerName > parent', parent);
			return { carerName: 'Query.cat.carer', dog: 'Query.cat.carer.dog' };
		},
	},
	Carer: {
		carerName: (parent, args, ctx) => {
			console.log('In Carer > carerName');
			// console.log('Carer > carerName > ctx isLoggedIn ', ctx.isLoggedIn);
			// console.log('Carer > carerName > parent', parent);
			const catName = `Carer.carerName`;
			return catName;
		},
		cat: () => {
			console.log('In Carer > cata');
			return {
				catName: 'Carer.cat',
				age: 0,
				carer: { carerName: 'Carer.cat.carer' },
			};
		},
		dog: () => {
			console.log('In Carer > dogName');
			return 'Carer.dog';
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		// This is just as an intro to what we can do with context
		// Get details from auth headers but omitted here...
		// Needs to be a function rather than object so that it runs with every request.
		let user;
		try {
			const tutor = await fetch(`${JSON_SERVER}/staff/51`);
			const data = await tutor.json();
			console.log('tutor id', data.id);
			user = { userId: data.id, isLoggedIn: true, role: 'ADMIN' };
			console.log('ctx.user', user);
		} catch {
			console.log('error getting user');
			user = null;
		}

		return user;
	},
});
// defaults to port 4000
server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`Index03 running at port ${url}`);
	console.log(`Need JSON SERVER running...`);
});
