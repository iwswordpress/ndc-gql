const { gql } = require('apollo-server');

const studentTypeDefs = require('./student');
const projectTypeDefs = require('./project');

const typeDefs = gql`
	type Query {
		_: String # placceholder as these cannot be empty
	}
	type Mutation {
		_: String # placceholder as these cannot be empty
	}
`;
module.exports = [typeDefs, studentTypeDefs, projectTypeDefs];
