const { ApolloServer, gql } = require('apollo-server');
//https://www.youtube.com/watch?v=wBrSXBpAd10
const typeDefs = gql`
	type ValidationError {
		field: String
		msg: String
	}

	type TimeoutError {
		reason: String
		seconds: Int
	}

	union Error = ValidationError | TimeoutError

	type Mutation {
		register: Error
	}

	type Query {
		hello: String
	}
`;

let showTimeoutError = false;

const resolvers = {
	Error: {
		__resolveType: (obj) => {
			if (obj.reason) {
				return 'TimeoutError';
			}

			if (obj.field) {
				return 'ValidationError';
			}

			return null;
		},
	},
	Query: { hello: () => 'hi' },
	Mutation: {
		register: () => {
			let error = {};

			if (showTimeoutError) {
				error = { reason: 'too many requests', seconds: 180 };
			} else {
				error = { field: 'email', msg: 'already taken' };
			}

			showTimeoutError = !showTimeoutError;

			return error;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({port:5000}).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
