const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		users: [User!]
		user(id: ID!): User
		animals: [Animal]
	}

	type User {
		id: ID!
		name: String!
		email: String!
		projects: [Project!]
	}
	enum AllowedColor {
		RED
		GREEN
		BLUE
	}
	interface Animal {
		species: String
	}
	#  caps for learning purpose not how it is done
	type Tiger implements Animal {
		species: String
		stripeCount: Int
	}
	type Lion implements Animal {
		species: String
		color: AllowedColor # we constrain color type
	}
`;
