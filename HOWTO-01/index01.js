const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

let links = [
	{
		id: 'link-0',
		url: 'www.howtographql.com',
		description: 'Fullstack tutorial for GraphQL',
	},
];

const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		// 2
		feed: () => links,
	},
	// 3
	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url,
	},
};
// 3
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen(5000).then(({ url }) => console.log(`Index01 is running on ${url}`));

// https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e#9d03
