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

	type Query {
		hello: String
		register: Error
		# we must now resolve Error as it is not a scalar type so execution moves to Error in resolvers
	}
`;

let showTimeoutError = false;

const resolvers = {
	// Error determines which of union types it is, returns it.
	// In Query.register in resolvers, we can then return data depending on union type.
	Error: {
		__resolveType: (obj) => {
			if (obj.reason) {
				return 'TimeoutError'; // passed on to the
			}

			if (obj.field) {
				return 'ValidationError';
			}

			return null;
		},
	},
	Query: {
		hello: () => 'hi',
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

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

//
