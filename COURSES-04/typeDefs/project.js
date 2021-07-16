const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		projects: [Project!]
		project(id: ID!): Project
		search(contains: String): [Result]
	}

	input createProjectInput {
		name: String!
		completed: Boolean!
		userId: ID!
	}

	extend type Mutation {
		createProject(input: createProjectInput!): Project
	}

	type Project {
		id: ID!
		name: String!
		completed: Boolean!
		user: User!
	}

	union Result = Book | Author

	type Book {
		bookTitle: String
	}

	type Author {
		authorName: String
	}
`;
