const gql = require('graphql-tag');

module.exports = gql`
	enum Role {
		ADMIN
		GUEST
		USER
	}

	type User {
		id: ID!
		firstName: String
		lastName: String
		email: String
		role: Role
	}

	type Query {
		userAuthenticated(id: Int): User
		userAuthorized(id: Int): User
	}
`;
