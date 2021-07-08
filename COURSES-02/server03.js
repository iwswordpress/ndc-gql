const { ApolloServer } = require('apollo-server');

const dotEnv = require('dotenv');

dotEnv.config();

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Server02 running at port ${url}`));
