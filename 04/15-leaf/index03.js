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
			return { catName: args.name, age: 3, carer: { carerName: 'Query.cat.SALLY', dog: 'FIDO' } };
			// return {  };
		},
		carer: (parent, args, ctx, info) => {
			console.log('In Query > carer');
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
			const catName = `Cat.catName`;
			return catName;
		},
		age: (parent, args, ctx) => {
			// if we comment this out then Carer.cat.age = 0 returned.
			console.log('In Cat > age');
			return Math.floor(Math.random() * 5000 + 1000);
		},
		carer: (parent, args, ctx) => {
			console.log('In Cat > carer');
			return { carerName: 'Cat.carer.carerName', dog: 'Query.cat.carer.dog' };
		},
	},
	Carer: {
		carerName: (parent, args, ctx) => {
			console.log('In Carer > carerName');
			const catName = `Carer.carerName`;
			return catName;
		},
		cat: () => {
			console.log('In Carer > cat');
			return {
				catName: 'Carer.cat',
				age: 0, // can return null if last in chain. If not error occurs.
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
			console.log('=== CTX ===');
			console.log('ctx.user', user);
			console.log('ctx.body.query', req.body.query);
			// console.log('ctx.body.query', req.body.query.replace(/\s/g, ''));
			console.log('=== CTX ===');
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

/*

query{
  cat(name: "Garfield"){
    catName
    age
    carer{
      carerName
      cat{
        catName
        age
      }
    }
  }
}

*/
