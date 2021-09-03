const { gql } = require('apollo-server');

module.exports = gql`
	extend type Query {
		users: [User!]
		getUserById(id: ID!): User!
	}
	type User {
		id: ID!
		name: String!
		email: String!
		tasks: [Task!]
	}
`;
