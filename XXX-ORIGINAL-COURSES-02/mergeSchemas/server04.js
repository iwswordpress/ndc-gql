const { ApolloServer } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

// const resolvers = require('../resolvers');
const resolvers = {};

const typeDefs = require('./mergeTypes');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => {
	console.log('====================================');
	console.log(`Server04 running at port ${url}`);
	console.log('!!!');
	console.log(`PLEASE NOTE: resolvers file is empty...just showing that the schema is merged...`);
});
