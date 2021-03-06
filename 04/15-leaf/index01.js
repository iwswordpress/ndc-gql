const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

// A cat has a carer.
// We are not attaching a cat to a carer for this demo as we are looking at Resolving Types
// A carer also has a dog.
const typeDefs = gql`
	type Query {
		cat(name: String): Cat!
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
// Query.cat - there is a resolver.
// Query.carer - there is a resolver.
// Carer.Cat
// Cat.Carer
// all the others resolve to SCALAR
// We will need to create resolvers for these.
// Without them we will get nulls for details of carer unless hard coded as in this example.
function showAST(info) {
	console.log('======== AST ========');
	console.log('[parentType]', info.parentType);
	console.log('[fieldName]', info.fieldName);
	console.log('[returnType]', info.returnType);
	console.log('=====================');
}
const resolvers = {
	Query: {
		cat: (parent, args, ctx, info) => {
			console.log('---> In Query > cat');
			showAST(info);
			console.log('Query > cat > parent: ', parent);
			console.log('Query > cat > args.name: ', args.name);
			console.log('Query > cat > ctx: ', ctx.isLoggedIn);

			return { catName: args.name, age: 22, carer: { carerName: 'Query.cat.SALLY', dog: 'FIDO' } };
			// return {  };
		},
		carer: (parent, args, ctx, info) => {
			console.log('---> In Query > carer');
			showAST(info);
			console.log('Query > owner > parent: ', parent);
			console.log('Query > owner > args.name: ', args.name);
			console.log('Query > owner > ctx: ', ctx.isLoggedIn);
			return {
				carerName: args.name,
				dog: 'Query.owner.TED',
			};
		},
	},
};
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		// function so it runs with every request
		return { isLoggedIn: true };
	},
});
// defaults to port 4000
server.listen({ port: 5000 }).then(({ url }) => console.log(`Index01 running at port ${url}`));

/*

query{
  cat(name: "Garfield"){
    catName
    age
    carer{
      carerName
    }
  }
}

*/
