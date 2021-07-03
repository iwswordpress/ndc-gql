const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	union Result = Book | Author

	type Book {
		bookTitle: String
	}

	type Author {
		authorName: String
	}

	type Query {
		search(contains: String): [Result]
	}
`;
const resolvers = {
	Result: {
		__resolveType(obj, context, info) {
			if (obj.authorName) {
				return 'Author';
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
			const bookTitle = args.contains + ' ' + Math.floor(Math.random() * 100) + ' - title of book';
			const authorName = args.contains + ' ' + Math.floor(Math.random() * 100) + ' - name of author';

			const data = [{ bookTitle }, { authorName }];

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
