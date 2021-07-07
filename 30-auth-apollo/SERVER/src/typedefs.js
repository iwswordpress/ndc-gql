const gql = require('graphql-tag');

module.exports = gql`
	enum Role {
		ADMIN
		MANAGER
		STAFF
		STUDENT
	}

	type User {
		id: ID!
		email: String!
		token: String
		role: Role
	}

	type AuthUser {
		token: String
		user: User
	}

	input SignupInput {
		email: String!
		password: String!
	}

	input SigninInput {
		email: String!
		password: String!
	}

	type Query {
		myDetails: User!
		getAdminData: String!
	}

	type Mutation {
		signup(input: SignupInput!): AuthUser!
		signin(input: SigninInput!): AuthUser!
	}
`;
