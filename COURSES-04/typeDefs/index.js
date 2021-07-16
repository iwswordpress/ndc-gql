const { gql } = require('apollo-server-express');

const userTypeDefs = require('./user');
const projectTypeDefs = require('./project');

const typeDefs = gql`
	type Query {
		_: String
	}
	type Mutation {
		_: String
	}
`;

module.exports = [typeDefs, userTypeDefs, projectTypeDefs];
