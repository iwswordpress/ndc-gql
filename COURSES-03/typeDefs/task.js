const { gql } = require('apollo-server');
module.exports = gql`
	extend type Query {
		tasks: [Task!]
		getTaskById(id: ID!): Task
	}

	type Task {
		id: ID!
		name: String!
		completed: Boolean!
		user: User
	}

	extend type Mutation {
		createTask(input: CreateTaskInput): Task!
	}

	input CreateTaskInput {
		name: String!
		completed: Boolean!
		userId: Int!
	}
	# schema {
	# 	query: Query
	# 	mutation: Mutation
	# }
`;
