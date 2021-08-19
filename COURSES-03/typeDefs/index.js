const { gql } = require('apollo-server');

const userTypeDefs = require('./user');
const taskTypeDefs = require('./task');

const typeDefs = gql`
	type Query {
		"""
		PLACEHOLDER
		"""
		_: String # placeholder as these cannot be empty
	}
	type Mutation {
		_: String # placeholder as these cannot be empty
	}
`;
module.exports = [typeDefs, userTypeDefs, taskTypeDefs];
