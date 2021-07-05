const gql = require('graphql-tag');

module.exports = gql`
	enum Role {
		ADMIN
		MEMBER
		GUEST
	}

	type User {
		id: ID! # log(format: "hello")
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
		role: Role!
	}

	input SigninInput {
		email: String!
		password: String!
	}

	type Query {
		me: User!
	}

	type Mutation {
		signup(input: SignupInput!): AuthUser!
		signin(input: SigninInput!): AuthUser!
	}
`;
