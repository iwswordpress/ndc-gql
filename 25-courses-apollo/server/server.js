const fs = require('fs'); // to read in the graphql file but other options to do this.

const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors'); // we will use localhost on a different port
const express = require('express');

const app = express();
app.use(cors(), express.json());

// Demo CONTEXT
const user = {
	role: 'MEMBER',
	id: 100,
};
const typeDefs = gql(fs.readFileSync('./schemas/schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers/resolvers');
const context = user;

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

// route for graphiql
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	// do authentication
	res.send({ email, token: 'VALID' });
});

const port = 5000;
app.listen(port, () => console.info(`Server started on port ${port}`));
