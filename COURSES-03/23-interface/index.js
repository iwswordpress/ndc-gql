const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	#  introducing enum - constraint on possilbe values
	enum PersonType {
		Student
		Tutor
		Staff
	}
	enum GradStatus {
		UNDERGRAD
		GRAD
		POSTGRAD
	}
	interface Person {
		id: ID!
		role: PersonType
		firstName: String
	}
	#  caps for learning purpose not how it is done
	type Student implements Person {
		id: ID!
		role: PersonType
		firstName: String
		year: Int
		gradStatus: GradStatus
	}
	type Staff implements Person {
		id: ID!
		role: PersonType
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
					role: 'Student',
					firstname: 'Sally',
					year: 22,
					gradStatus: 'GRAD', // needs to be String not ENUM value
				},
				{
					id: 23,
					role: 'Student',
					firstname: 'James',
					year: 25,
					gradStatus: 'POSTGRAD',
				},
				{ id: 33, role: 'Staff', firstname: 'John', dept: 'IT' },
				{ id: 34, role: 'Staff', firstname: 'Peter', dept: 'HR' },
			];
		},
	},

	Person: {
		__resolveType(person, context, info) {
			console.log(`__resolving Person type as ---> ${person.species}`);
			return person.role;
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

      year
    }
    ... on Staff {
      __typename
      id
      firstName
      role
      dept
    }
  }
}

*/
