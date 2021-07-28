const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	union Result = Book | Video

	type Book {
		bookTitle: String
		page: Int
		price: Int
	}

	type Video {
		videoTitle: String
		length: Int
		isFree: Boolean
	}

	type Query {
		search(contains: String): [Result]
	}
	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;
const resolvers = {
	Result: {
		__resolveType(obj, context, info) {
			if (obj.videoTitle) {
				return 'Video';
			}

			if (obj.bookTitle) {
				return 'Book';
			}

			return null;
		},
	},
	Query: {
		search: (_, args) => {
			// From data response
			const bookResults = { bookTitle: 'GraphQL Apollo', page: 33, price: Math.floor(Math.random() * 100) };
			const videoResults = { videoTitle: 'GraphQL Server', length: Math.floor(Math.random() * 100), isFree: true };

			const data = [bookResults, videoResults];

			return data;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
