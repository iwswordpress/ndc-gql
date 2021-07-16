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
`;

module.exports = [typeDefs];
