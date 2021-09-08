const { ApolloServer, gql } = require('apollo-server');
const colors = require('colors');

const typeDefs = gql`
	enum GradStatus {
		UNDERGRAD
		GRAD
		POSTGRAD
	}
	interface Person {
		id: ID!
		role: String
		firstName: String
	}
	#  caps for learning purpose not how it is done
	type Student implements Person {
		id: ID!
		role: String
		firstName: String
		year: Int
		gradStatus: GradStatus
	}
	type Staff implements Person {
		id: ID!
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
			console.log('Query > person.role');

			return [
				{
					id: 22,
					role: 'Student',
					firstName: 'Sally',
					year: 22,
					gradStatus: 'GRAD', // needs to be String not ENUM value
				},
				{
					id: 23,
					role: 'Student',
					firstName: 'James',
					year: 25,
					gradStatus: 'POSTGRAD',
				},
				{ id: 33, role: 'Staff', firstName: 'John', dept: 'IT' },
				{ id: 34, role: 'Staff', firstName: 'Peter', dept: 'HR' },
			];
		},
	},

	Person: {
		__resolveType(person, context, info) {
			// In this case the value in person.role will be the Interface type so it will yield the correct Type.
			// We can enforce the value using ENUMS.
			console.log(`__resolving Person type as ---> ${person.role}`);
			return person.role;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀 Running index01 on ${url}...`);
});
/*

query {
  People: users {
    ... on Student {
      __typename
      id
      firstName
      role
      year
			gradStatus
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
