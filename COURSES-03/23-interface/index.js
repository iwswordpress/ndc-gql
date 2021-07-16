const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	#  introducing enum - constraint on possilbe values
	enum PersonType {
		STAFF
		TUTOR
		STUDENT
	}
	interface Person {
		id: ID!
		species: String
		role: PersonType # we constrain color type
		firstName: String
	}
	#  caps for learning purpose not how it is done
	type Tiger implements Person {
		id: ID!
		species: String
		stripeCount: Int
		role: PersonType # we constrain color type
		firstName: String
	}
	type Lion implements Person {
		id: ID!
		species: String
		role: PersonType # we constrain color type
		firstName: String
	}

	type Query {
		users: [Person]
	}

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;
const resolvers = {
	// This is where the usual return of data goes...
	Query: {
		users: () => {
			console.log('Query > animals and giving typs of species');

			return [
				{
					id: 22,
					species: 'Tiger',
					stripeCount: 22,
				},
				{ id: 33, species: 'Lion', role: 'STAFF' },
			];
		},
	},
	// We need this extra resolver function to let GQL know which type of Animal it is working with
	/*
THIS WILL BE ERROR WITHOUT 
 "message": "Abstract type Animal must resolve to an Object type at runtime for field Query.animals with value { species: \"Tiger\", stripeCount: 22 }, received \"undefined\". Either the Animal type should provide a \"resolveType\" function or each possible type should provide an \"isTypeOf\" function.",

	*/
	Person: {
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
