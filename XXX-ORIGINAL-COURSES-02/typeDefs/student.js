const { gql } = require('apollo-server');

module.exports = gql`
	extend type Query {
		students: [Student!]
		getStudentById(id: ID!): Student!
	}
	type Student {
		id: ID!
		name: String!
		email: String!
		projects: [Project!]
	}
`;
