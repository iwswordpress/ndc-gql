const { ApolloServer, gql } = require('apollo-server');

const textbooks = {
	title: 'textbook title',
	author: 'textbook author',
	course: 'RXJS',
};
const coloringbooks = {
	title: 'coloring title',
	author: 'coloring author',
	color: 'RED',
};
const typeDefs = gql`
	interface Book {
		title: String!
		author: String!
	}

	type TextBook implements Book {
		title: String!
		author: String!
		course: String!
	}

	type ColoringBook implements Book {
		title: String!
		author: String!
		color: String
	}

	type Query {
		books: [Book!]!
	}

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;
const resolvers = {
	Book: {
		__resolveType(book, context, info) {
			if (book.course) {
				return 'TextBook';
				// very important that the return matches the Interface as this tells GQL what type it is.
				// change the return to see it break.
			}
			if (book.color) {
				return 'ColoringBook';
			}
			return null; // GraphQLError is thrown
		},
	},
	Query: {
		books: () => {
			return [textbooks, coloringbooks];
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀 book.js ready at ${url}`);
});
/*
query GetBooks {
  books {
    title
    author
    ... on TextBook {
      __typename
      course
    }
    ... on ColoringBook {
      __typename
      color
    }
  }
}
*/
