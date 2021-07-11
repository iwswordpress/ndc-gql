const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');

let links = [
	{
		id: 'link-0',
		url: 'www.howtographql.com',
		description: 'Fullstack tutorial for GraphQL',
	},
];

let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
	},
	Mutation: {
		// 2
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			};
			links.push(link);
			return link;
		},
		updateLink: (parent, args) => {
			links[args.id].url = args.url;
			links[args.id].description = args.description;
			return links[args.id];
		},
		deleteLink: (parent, args) => {
			links.splice(args.id, 1);
			return `Link ${args.id} deleted`;
		},
	},
};

const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema02.graphql'), 'utf8'),
	resolvers,
});

server.listen(5000).then(({ url }) => console.log(`Index02 is running on ${url}`));
