const { gql } = require('apollo-server');

const typeDefs = gql`
	directive @auth(requires: Role!) on FIELD_DEFINITION

	enum Role {
		ADMIN
		GUEST
		USER
	}

	type User {
		id: ID
		firstName: String
		role: Role
	}

	type Query {
		viewUser(id: Int): User @auth(requires: ADMIN) # place on firstName instead to see effect...
	}
`;

module.exports = typeDefs;
