const { ApolloServer, gql } = require('apollo-server');

const staff = {
	personType: 'STAFF',
	firstName: 'Charlie',
	dept: 'IT',
};
const students = {
	personType: 'STUDENT',
	firstName: 'Sally',
	year: 2020,
};
const tutors = {
	personType: 'TUTOR',
	firstName: 'David',
	subject: 'Node',
};
const typeDefs = gql`
	interface Person {
		id: ID!
		personType: String
		firstName: String
		lastName: String
		email: String
	}
	#  caps for learning purpose not how it is done
	type Student implements Person {
		id: ID!
		personType: String
		firstName: String
		lastName: String
		email: String
		year: String
	}

	type Tutor implements Person {
		id: ID!
		personType: String
		firstName: String
		lastName: String
		email: String
		subject: String
	}
	type Staff implements Person {
		id: ID!
		personType: String
		firstName: String
		lastName: String
		email: String
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
	Person: {
		__resolveType(person, context, info) {
			if (person.dept) {
				console.log('RESOLVED TO:', person.personType);
				return 'STAFF';
			}
			if (person.year) {
				console.log('RESOLVED TO:', person.personType);
				return 'STUDENT';
			}
			if (person.subject) {
				console.log('RESOLVED TO:', person.personType);
				return 'TUTOR';
			}
			return null; // GraphQLError is thrown
		},
	},
	Query: {
		users: () => {
			console.log('Query > users');
			return [staff, students, tutors];
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
