const { gql } = require('apollo-server');
module.exports = gql`
	extend type Query {
		projects: [Project!]
		getProjectById(id: ID!): Project
	}

	type Project {
		id: ID!
		name: String!
		completed: Boolean!
	}

	extend type Mutation {
		createProject(input: CreateProjectInput): Project!
	}

	input CreateProjectInput {
		name: String!
		completed: Boolean!
	}
	# schema {
	# 	query: Query
	# 	mutation: Mutation
	# }
`;
