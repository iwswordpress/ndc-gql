const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		users: [Person]
	}

	enum PersonType {
		STAFF
		TUTOR
		STUDENT
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
	}
	type Staff implements Person {
		id: ID!
		role: String
		firstName: String
		dept: String
	}
`;
