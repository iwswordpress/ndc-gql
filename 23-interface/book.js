const { ApolloServer, gql } = require('apollo-server');

const tb = {
	title: 'textbook title',
	author: 'textbook author',
	price: 30,
};
const cb = {
	title: 'coloring title',
	author: 'coloring author',
	color: 'BLUE',
};
const typeDefs = gql`
	interface Book {
		title: String
		author: String
	}
	#  caps for learning purpose not how it is done
	type TEXTBOOK implements Book {
		title: String
		author: String
		price: Int
	}

	type COLORINGBOOK implements Book {
		title: String
		author: String
		color: String
	}

	type Query {
		schoolBooks: [Book]
	}

	# schema is included by default but shows why query is a reserved work in playground
	schema {
		query: Query
	}
`;
const resolvers = {
	Book: {
		__resolveType(book, context, info) {
			if (book.courses) {
				return 'TEXTBOOK';
			}
			if (book.colors) {
				return 'COLORINGBOOK';
			}
			return null; // GraphQLError is thrown
		},
	},
	Query: {
		schoolBooks: () => {
			return [tb, tb];
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
