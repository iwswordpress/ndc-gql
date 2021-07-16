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
		role: String
		firstName: String
	}
	#  caps for learning purpose not how it is done
	type Student implements Person {
		id: ID!
		species: String
		role: String
		firstName: String
		year: Int
	}
	type Staff implements Person {
		id: ID!
		species: String
		role: String
		firstName: String
		dept: String
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
					species: 'Student',
					role: 'STUDENT',
					firstname: 'Sally',
					year: 22,
				},
				{ id: 33, species: 'Staff', role: 'STAFF', firstname: 'John', dept: 'IT' },
			];
		},
	},

	Person: {
		__resolveType(person, context, info) {
			console.log(`__resolving Person type as ---> ${person.species}`);
			return person.species;
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
/*
query {
  Students: users {
    ... on Student {
      __typename
      id
      firstName
      role
      species
      year
    }
  }
  Staff: users {
    ... on Staff {
      __typename
      id
      firstName
      role
      species
      dept
    }
  }
}
*/
