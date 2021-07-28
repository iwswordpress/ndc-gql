const { gql } = require('apollo-server');

const userTypeDefs = require('./user');
const taskTypeDefs = require('./task');

const typeDefs = gql`
	type Query {
		_: String # placceholder as these cannot be empty
	}
	type Mutation {
		_: String # placceholder as these cannot be empty
	}
`;
module.exports = [typeDefs, userTypeDefs, taskTypeDefs];
