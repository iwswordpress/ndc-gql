const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Query {
		users: [Person]
	}

	enum PersonType {
		Student
		Tutor
		Staff
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
		status: String
	}
	type Staff implements Person {
		id: ID!
		role: PersonType
		firstName: String
		dept: String
	}
`;

module.exports = [typeDefs];
