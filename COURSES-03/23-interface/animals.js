const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	#  introducing enum - constraint on possilbe values
	enum AllowedColor {
		RED
		GREEN
		BLUE
	}
	interface Animal {
		species: String
	}
	#  caps for learning purpose not how it is done
	type Tiger implements Animal {
		species: String
		stripeCount: Int
	}
	type Lion implements Animal {
		species: String
		color: AllowedColor # we constrain color type
	}

	type Query {
		animals: [Animal]
	}

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;
const resolvers = {
	// This is where the usual return of data goes...
	Query: {
		animals: () => {
			console.log('Query > animals and giving typs of species');

			return [
				{
					species: 'Tiger',
					stripeCount: 22,
				},
				{ species: 'Lion', color: 'RED' },
			];
		},
	},
	// We need this extra resolver function to let GQL know which type of Animal it is working with
	/*
THIS WILL BE ERROR WITHOUT 
 "message": "Abstract type Animal must resolve to an Object type at runtime for field Query.animals with value { species: \"Tiger\", stripeCount: 22 }, received \"undefined\". Either the Animal type should provide a \"resolveType\" function or each possible type should provide an \"isTypeOf\" function.",

	*/
	Animal: {
		__resolveType(animal, context, info) {
			console.log(`__resolving Animal type as ---> ${animal.species}`);
			return animal.species;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
