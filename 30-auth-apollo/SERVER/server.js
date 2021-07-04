const fs = require('fs'); // to read in the graphql file but other options to do this.
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors'); // we will use localhost on a different port
const express = require('express');

const auth = require('./middleware/auth');

const app = express();
app.use(cors(), express.json());

// Demo CONTEXT
const user = {
	role: 'MEMBER',
	id: 100,
};
const typeDefs = gql(fs.readFileSync('./schemas/schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers/resolvers.js');
const context = user;

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

// route for graphiql
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	// do authentication
	res.send({ email, token: 'VALID' });
});

const PORT = 50;
app.listen(PORT, () => {
	console.info(`Server started on http://localhost:${PORT}/graphql`);
	console.log('START JSON SERVER dev:courses!');
});
