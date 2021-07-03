const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	union Result = Book | Author

	type Book {
		title: String
	}

	type Author {
		name: String
	}

	type Query {
		search: [Result]
	}
`;
const resolvers = {
	Result: {
		__resolveType(obj, context, info) {
			if (obj.name) {
				return 'Author';
			}

			if (obj.title) {
				return 'Book';
			}

			return null;
		},
	},
	Query: {
		search: () => {
			const data = [{ title: 'test title' }, { name: 'test name' }];

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
