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
		// We need to tell GQL which of the Union types we have currently
		// We provide the name by resolvingType based on a unique attribute of that Union type...
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
/*
Q1

query {
  AllMedia: search(contains: "GraphQL") {
    ... on Book {
      __typename
      bookTitle
      page
      price
    }
    ... on Video {
      __typename
      videoTitle
      length
      isFree
    }
  }
}

Q2

query {
  Books: search(contains: "GraphQL") {
    ... on Book {
      __typename
      bookTitle
      page
      price
    }
  }
  Videos: search(contains: "test") {
    ... on Video {
      __typename
      videoTitle
      length
      isFree
    }
  }
}

*/
