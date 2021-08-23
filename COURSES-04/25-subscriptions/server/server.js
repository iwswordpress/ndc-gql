const fs = require('fs');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');

const PORT = 5000;

const app = express();
app.use(cors(), express.json());

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf8' });
const resolvers = require('./resolvers');

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ userId: 100, status: 'AUTHENTICATED' }),
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/graphql`));

/*
Separate browser tabs not new tab in playground
TAB 1

 subscription{
  messageAdded
}

TAB 2
mutation{
  RESPONSE:addMessage(input:"test4")
}

*/
